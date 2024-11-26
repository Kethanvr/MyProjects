import google.generativeai as genai
import os

# Configure the Gemini API
genai.configure(api_key='AIzaSyDKBPFjPUjx98CKSLt-YAFz_QO3m0Lqt5o')

# Function to upload the image to Gemini
def prep_image(image_path):
    # Upload the file and print a confirmation
    sample_file = genai.upload_file(path=image_path, display_name="Diagram")
    print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
    return sample_file  # Returns the sample_file object, which includes the URI

# Function to extract text from the uploaded image
def extract_text_from_image(image_uri, prompt):
    # Choose a Gemini model
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    # Prompt the model with text and the previously uploaded image
    response = model.generate_content([image_uri, prompt])
    return response.text

# Provide the path to the image
image_path = "53mw2y0y6ly91.jpg"

# Upload the image and retrieve the file object
uploaded_file = prep_image(image_path)

# Extract the URI of the uploaded image
image_uri = uploaded_file.uri

# Use the URI to extract text with a prompt
prompt = "Extract all ingredients and provide their side effects."
extracted_text = extract_text_from_image(image_uri, prompt)

# Print the extracted text
print("Extracted Text:")
print(extracted_text)
