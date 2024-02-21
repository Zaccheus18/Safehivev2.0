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

# Creating a FastAPI instance
app = FastAPI()

# Adding CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to save uploaded images
UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), 'uploads')

# Function to get image size
def get_image_size(file_path):
    with Image.open(file_path) as img:
        return img.size

# Function Description #

# Function to load the model and initialize its corresponding weights
# It reconstructs the neural network model's architecture from the loaded JSON.
# Then the pre-trained weights are loaded into the model

# -------------------- #
# Loading the pre-trained model
def load_model():
    json_file = open('Model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("weights/model_A_weights.h5")
    return loaded_model

# Function Description #

# Function to prepare the image input to the neural network
# The input is converted to a NumPy array, normalize its pixel values, and add an extra dimension to the array
# The normalization involves subtracting the mean and dividing by the standard deviation for each color channel. 
# This ensures that the pixel values are centered around zero and have a standard deviation of one so that the
# image is acceptable as input for the neural network

# -------------------- #
def create_img(path, target_size):
   # Open the image file and convert it to RGB format
    im = Image.open(path).convert('RGB')
    im = im.resize(target_size)
    # Convert the image to a NumPy array
    im = np.array(im)
    # Normalize the pixel values to the range [0, 1]
    im = im / 255.0
    # Apply per-channel normalization using mean and standard deviation
    im[:, :, 0] = (im[:, :, 0] - 0.485) / 0.229
    im[:, :, 1] = (im[:, :, 1] - 0.456) / 0.224
    im[:, :, 2] = (im[:, :, 2] - 0.406) / 0.225
    # Add an extra dimension to the array to make it suitable as input to a neural network
    im = np.expand_dims(im, axis=0)
    return im


# Function Description #

# Function to load and use the model to generate the crowd count estimate and density map
# It initially loads the model, then takes the file path of the image for normalization.
# Afterwards, the said image will be fed to the model for generating its density map, along with its estimated count

# -------------------- #

def predict(path, target_size):
    # Load the pre-trained model
    model = load_model()
    # Normalize the image for prediction (Normalized image)
    image = create_img(path, target_size)
    # Use the loaded model to generate the density map (Density Map)
    ans = model.predict(image)
    # Sum up the predictions to get the estimated count (Crowd Count)
    count = np.sum(ans)

    return count, image, ans


# Function Description #

# Function to determine the crowd status and crowd density frequency
# These are the added features that are used solely for visualization purposes for the algorithm's prediction
# To determine these two aspects, it considers two factors which are the crowd estimate of the model and the user input for a crowd threshold
# The crowd count value and a series of crowd threshold value percentages are compared with the use of ranges and conditional statements
# If the count belongs to a specific range of crowd threshold value percentages, 
# then the assigned labels will be its crowd status and density frequency
def frequency_status(prediction_count, threshold):
    # Crowd Status and Density Frequency Labels
    status = ['No Crowd', 'Sparse Crowd', 'Medium Dense Crowd', 'Dense Crowd']
    freq = ['Low', 'Medium', 'High']
    
    # Initialize the variables as none to put the appropriate labels later on
    crowd_status = None
    crowd_freq = None

    # Define thresholds based on user input
    percentage1 = int(threshold * 0.33)
    percentage2 = int(threshold * 0.66)
    percentage3 = int(threshold * 1)


# If the count is equals to zero AND the limit is greater than 0 then,
    # Crowd Status and Density Frequency will be as "No Crowd" and "Low", respectively
    if ((prediction_count == 0) and (threshold > 0)): 
        # Color-code: Green
        crowd_status = status[0]
        crowd_freq = freq[0]
    else:
        # If the count is in between 100% and 67% of limit OR if count is greater than 100% of count then,
        # Crowd Status and Density Frequency will be as "Dense Crowd" and "High", respectively
        if ((percentage2 < prediction_count <= percentage3)) or (prediction_count > percentage3): 
            # Color-code: Red
            crowd_status = status[3]
            crowd_freq = freq[2]
        # If the count is in between 66% and 34% of limit then,
        # Crowd Status and Density Frequency will be as "Medium Dense Crowd" and "Medium", respectively
        elif ((percentage1 < prediction_count <= percentage2)): 
            # Color-code: Yellow
            crowd_status = status[2]
            crowd_freq = freq[1]
        # If the count is less than 33% of limit then,
        # Crowd Status and Density Frequency will be as "Sparse Crowd" and "Low", respectively
        elif ((prediction_count <= percentage1)): 
            # Color-code: Green
            crowd_status = status[1]
            crowd_freq = freq[0]    
        else:
            crowd_status = "Invalid"
            crowd_freq = "Invalid"

    return crowd_status, crowd_freq

# Endpoint for crowd density prediction
@app.post('/predict')
async def predict_crowd_density(file: UploadFile = File(...), threshold: int = Form(...)):
    # Define the path to save the uploaded file
    file_path = os.path.join(UPLOAD_DIRECTORY, 'temp.jpg')
    
    # Write the content of the uploaded file to 'temp.jpg'
    with open(file_path, 'wb') as buffer:
        content = await file.read()
        buffer.write(content)

    # Get the size of the uploaded image
    uploaded_image_size = get_image_size(file_path)
    target_image_size = uploaded_image_size

    # Predict crowd density using the uploaded image
    count, img, hmap = predict(file_path, target_image_size)
    est_count = count
    
    # Determine crowd status and frequency based on threshold
    crowd_status, crowd_freq = frequency_status(count, threshold)

    # Generate and save heatmap image
    plt.imshow(hmap.reshape(hmap.shape[1], hmap.shape[2]), cmap='jet')
    plt.axis('off')
    heatmap_path = os.path.join(UPLOAD_DIRECTORY, 'cd_heatmap.png')
    plt.savefig(heatmap_path, bbox_inches='tight', pad_inches=0)
    plt.close()

    # Prepare response data with estimated count, crowd status, frequency, and heatmap path
    response = {
        'estimatedCount': int(est_count),
        'crowdStatus': crowd_status,
        'crowdDensityFrequency': crowd_freq,
        'crowdDensity': f"/uploads/cd_heatmap.png"
    }

    return response


# Endpoint to serve uploaded files
@app.get('/uploads/{filename}')
async def uploaded_file(filename):
    return FileResponse(os.path.join(UPLOAD_DIRECTORY, filename))

if __name__ == '__main__':
    # Create uploads directory if it doesn't exist
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    
    # Run the FastAPI app using Uvicorn server
    uvicorn.run(app, host='0.0.0.0', port=8000)
