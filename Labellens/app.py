from flask import Flask, request, jsonify, render_template
import cv2
import numpy as np
import requests
from pyzbar.pyzbar import decode

app = Flask(__name__)

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
    except requests.exceptions.RequestException as e:
        print(f"Error fetching product details: {e}")
        return None

@app.route('/')
def home():
    return render_template('home.html')  # Serve the home page

@app.route('/product.html')
def product():
    return render_template('product.html')  # Serve the product scanner page

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
        'product_image': product_details.get('image_url', None),  # Include product image URL
        'energy': nutritional_info.get('energy-kcal_100g', 0),
        'fat': nutritional_info.get('fat_100g', 0),
        'carbohydrates': nutritional_info.get('carbohydrates_100g', 0),
        'sugars': nutritional_info.get('sugars_100g', 0),
        'proteins': nutritional_info.get('proteins_100g', 0),
        'fiber': nutritional_info.get('fiber_100g', 0),
        'salt': nutritional_info.get('salt_100g', 0),
    }

    return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
