import os
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm as c
import tensorflow as tf
from keras.models import model_from_json
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), 'uploads')

def get_image_size(file_path):
    with Image.open(file_path) as img:
        return img.size  # Returns width and height of the uploaded image

def load_model():
    json_file = open('Model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("weights/model_A_weights.h5")
    return loaded_model

def create_img(path, target_size):
    im = Image.open(path).convert('RGB')
    im = im.resize(target_size)  # Resize the image
    im = np.array(im)
    im = im / 255.0
    im[:, :, 0] = (im[:, :, 0] - 0.485) / 0.229
    im[:, :, 1] = (im[:, :, 1] - 0.456) / 0.224
    im[:, :, 2] = (im[:, :, 2] - 0.406) / 0.225
    im = np.expand_dims(im, axis=0)
    return im

def predict(path, target_size):
    model = load_model()
    image = create_img(path, target_size)  # Pass the target_size to create_img function
    ans = model.predict(image)
    count = np.sum(ans)
    return count, image, ans

def frequency_status(prediction_count, threshold):
    status = ['No Crowd', 'Sparse Crowd', 'Medium Dense Crowd', 'Dense Crowd']
    freq = ['Low', 'Medium', 'High']
    crowd_status = None
    crowd_freq = None

    # Crowd Status Metrics
    percentage1 = int(threshold * 0.2)
    percentage2 = int(threshold * 0.4)
    percentage3 = int(threshold * 0.6)
    percentage4 = int(threshold * 0.8)
    percentage5 = int(threshold * 1)

    if threshold == 0 or prediction_count <= percentage1:
        crowd_status = status[0]
        crowd_freq = freq[0]
    elif percentage1 < prediction_count <= percentage2:
        crowd_status = status[1]
        crowd_freq = freq[0]
    elif percentage2 < prediction_count <= percentage3:
        crowd_status = status[2]
        crowd_freq = freq[1]
    elif percentage3 < prediction_count <= percentage4:
        crowd_status = status[3]
        crowd_freq = freq[2]
    elif percentage4 < prediction_count <= percentage5:
        crowd_status = status[3]
        crowd_freq = freq[2]
    else:
        # Handle the case when threshold > percentage5
        crowd_status = status[3]
        crowd_freq = freq[2]

    return crowd_status, crowd_freq


@app.post('/predict')
async def predict_crowd_density(file: UploadFile = File(...), threshold: int = Form(...)):
    file_path = os.path.join(UPLOAD_DIRECTORY, 'temp.jpg')
    with open(file_path, 'wb') as buffer:
        content = await file.read()
        buffer.write(content)

    uploaded_image_size = get_image_size(file_path)  # Get uploaded image size
    target_image_size = uploaded_image_size  # Set target size to uploaded image size

    count, img, hmap = predict(file_path, target_image_size)  # Pass target_image_size to predict function
    est_count = count
    crowd_status, crowd_freq = frequency_status(count, threshold)

    plt.imshow(hmap.reshape(hmap.shape[1], hmap.shape[2]), cmap='jet')
    plt.axis('off')
    heatmap_path = os.path.join(UPLOAD_DIRECTORY, 'cd_heatmap.png')
    plt.savefig(heatmap_path, bbox_inches='tight', pad_inches=0)
    plt.close()

    response = {
        'estimatedCount': int(est_count),
        'crowdStatus': crowd_status,
        'crowdDensityFrequency': crowd_freq,
        'crowdDensity': f"/uploads/cd_heatmap.png"
    }

    return response

@app.get('/uploads/{filename}')
async def uploaded_file(filename):
    return FileResponse(os.path.join(UPLOAD_DIRECTORY, filename))

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    uvicorn.run(app, host='0.0.0.0', port=8000)


