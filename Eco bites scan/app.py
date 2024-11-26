from flask import Flask, request, jsonify, send_from_directory, render_template
import cv2
import numpy as np
import requests
from pyzbar.pyzbar import decode

app = Flask(__name__)

# Serve index.html from the root directory
# @app.route('/')
# def index():
#     return render_template('home.html')  # Render the HTML file

@app.route('/product')
def product():
    return render_template('product.html')  # Render the product scanning page

# Function to get traffic light color for nutritional values
def get_traffic_light_color(value, high_threshold, medium_threshold):
    if value > high_threshold:
        return 'red'
    elif value > medium_threshold:
        return 'yellow'
    else:
        return 'green'

# Function to fetch product details from Open Food Facts
def fetch_product_details(barcode):
    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            product_data = response.json()
            if product_data['status'] == 1:
                return product_data['product']
            return None
        return None
    except requests.exceptions.RequestException:
        return None

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded.'})

    file = request.files['file']
    if not file:
        return jsonify({'status': 'error', 'message': 'No file uploaded.'})

    # Read the image using OpenCV
    in_memory_file = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

    # Decode the barcode
    barcodes = decode(image)
    if not barcodes:
        return jsonify({'status': 'error', 'message': 'No barcode found.'})

    barcode_data = barcodes[0].data.decode('utf-8')
    product_details = fetch_product_details(barcode_data)

    if not product_details:
        return jsonify({'status': 'error', 'message': 'Product not found in the database.'})

    # Extract relevant product information
    nutritional_info = product_details.get('nutriments', {})
    response_data = {
        'status': 'success',
        'barcode': barcode_data,
        'product_name': product_details.get('product_name', 'Unknown'),
        'energy': nutritional_info.get('energy-kcal_100g', 0),
        'fat': nutritional_info.get('fat_100g', 0),
        'carbohydrates': nutritional_info.get('carbohydrates_100g', 0),
        'sugars': nutritional_info.get('sugars_100g', 0),
        'proteins': nutritional_info.get('proteins_100g', 0),
        'fiber': nutritional_info.get('fiber_100g', 0),
        'salt': nutritional_info.get('salt_100g', 0)
    }

    return jsonify(response_data)
from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini API
genai.configure(api_key='AIzaSyDKBPFjPUjx98CKSLt-YAFz_QO3m0Lqt5o')

# Function to prepare and upload image


# Function to upload image to Gemini
def prep_image(image_path):
    sample_file = genai.upload_file(path=image_path, display_name="Diagram")
    return sample_file

# Function to extract text from the image using Gemini
def extract_text_from_image(image_path, prompt):
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    response = model.generate_content([image_path, prompt])
    return response.text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/extract', methods=['POST'])
def extract_text():
    try:
        # Check if file is uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Save the uploaded file to the predefined directory
        file_path = "53mw2y0y6ly91.jpg"
        file.save(file_path)

        # Prepare the image using Gemini
        sample_file = prep_image(file_path)

        # Extract text using Gemini
        prompt = "See all the ingredients used in the picture and provide each of their side effects."
        extracted_text = extract_text_from_image(sample_file.uri, prompt)

        return jsonify({'text': extracted_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)

