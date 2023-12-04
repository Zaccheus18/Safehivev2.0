import os
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm as c
import tensorflow as tf  # Added TensorFlow import
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

def load_model():
    json_file = open('Model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("weights/model_A_weights.h5")
    return loaded_model

def create_img(path):
    im = Image.open(path).convert('RGB')
    im = np.array(im)
    im = im / 255.0
    im[:, :, 0] = (im[:, :, 0] - 0.485) / 0.229
    im[:, :, 1] = (im[:, :, 1] - 0.456) / 0.224
    im[:, :, 2] = (im[:, :, 2] - 0.406) / 0.225
    im = np.expand_dims(im, axis=0)
    return im

def predict(path):
    model = load_model()
    image = create_img(path)
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
    try:
        # Write uploaded file to disk
        file_path = os.path.join(UPLOAD_DIRECTORY, 'temp.jpg')
        with open(file_path, 'wb') as buffer:
            content = await file.read()
            buffer.write(content)

        # Predict using the uploaded file
        count, _, _ = predict(file_path)
        crowd_status, crowd_freq = frequency_status(count, threshold)

        response = {
            'estimatedCount': int(count),
            'crowdStatus': crowd_status,
            'crowdDensityFrequency': crowd_freq,
        }

        return response
    except Exception as e:
        return {"error": str(e)}



@app.get('/uploads/{filename}')
async def uploaded_file(filename):
    return FileResponse(os.path.join(UPLOAD_DIRECTORY, filename))

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    uvicorn.run(app, host='0.0.0.0', port=8000)