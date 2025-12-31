from flask import Flask, request, render_template, send_from_directory
import numpy as np
import os
import sys
import pickle
import pandas as pd
from pathlib import Path

# Add the project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

app = Flask(__name__, 
            template_folder=os.path.join(project_root, 'templates'),
            static_folder=os.path.join(project_root, 'static'))

# Global variables for model and preprocessor
model = None
preprocessor = None

def load_artifacts():
    """Load model and preprocessor lazily"""
    global model, preprocessor
    
    if model is not None and preprocessor is not None:
        return model, preprocessor
    
    MODEL_PATH = os.path.join(project_root, 'Artifacts', 'model.pkl')
    PREPROCESSOR_PATH = os.path.join(project_root, 'Artifacts', 'preprocessor.pkl')
    
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            print("Model loaded successfully")
        else:
            print(f"Model file not found at: {MODEL_PATH}")
            
        if os.path.exists(PREPROCESSOR_PATH):
            with open(PREPROCESSOR_PATH, 'rb') as f:
                preprocessor = pickle.load(f)
            print("Preprocessor loaded successfully")
        else:
            print(f"Preprocessor file not found at: {PREPROCESSOR_PATH}")
    except Exception as e:
        print(f"Error loading artifacts: {e}")
    
    return model, preprocessor

@app.route("/static/<path:filename>")
def serve_static(filename):
    """Serve static files"""
    try:
        return send_from_directory(app.static_folder, filename)
    except Exception as e:
        return str(e), 404

@app.route("/health")
def health():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "message": "Airbnb Price Prediction API is running",
        "model_loaded": model is not None,
        "preprocessor_loaded": preprocessor is not None
    }

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        try:
            # Load artifacts
            model, preprocessor = load_artifacts()
            
            if model is None or preprocessor is None:
                return render_template("index.html", 
                    result="Error: Model or preprocessor not loaded. Please ensure model artifacts are available.")
            
            # Get form data with defaults
            property_type = request.form.get("property_type", "Apartment")
            room_type = request.form.get("room_type", "Entire home/apt")
            amenities = request.form.get("amenities", "")
            
            # Handle numeric fields
            try:
                accommodates = int(request.form.get("accommodates", 1))
            except (ValueError, TypeError):
                accommodates = 1
            
            try:
                bathrooms_str = request.form.get("bathrooms", "1")
                bathrooms = float(bathrooms_str) if bathrooms_str else 1.0
            except (ValueError, TypeError):
                bathrooms = 1.0
            
            bed_type = request.form.get("bed_type", "Real Bed")
            cancellation_policy = request.form.get("cancellation_policy", "flexible")
            cleaning_fee = request.form.get("cleaning_fee", "1") == "1"
            city = request.form.get("city", "NYC")
            host_has_profile_pic = request.form.get("host_has_profile_pic", "1") == "1"
            host_identity_verified = request.form.get("host_identity_verified", "1") == "1"
            
            # Handle host_response_rate
            try:
                host_response_rate_str = request.form.get("host_response_rate", "100")
                host_response_rate = f"{int(host_response_rate_str)}%"
            except (ValueError, TypeError):
                host_response_rate = "100%"
            
            instant_bookable = request.form.get("instant_bookable", "1") == "1"
            neighbourhood = request.form.get("neighbourhood", "")
            
            try:
                number_of_reviews = int(request.form.get("number_of_reviews", 0))
            except (ValueError, TypeError):
                number_of_reviews = 0
            
            try:
                review_scores_rating = int(request.form.get("review_scores_rating", 0))
            except (ValueError, TypeError):
                review_scores_rating = 0
            
            try:
                bedrooms = int(request.form.get("bedrooms", 0))
            except (ValueError, TypeError):
                bedrooms = 0
            
            try:
                beds = int(request.form.get("beds", 0))
            except (ValueError, TypeError):
                beds = 0

            # Create dataframe with all required columns
            data = {
                'property_type': [property_type],
                'room_type': [room_type],
                'amenities': [amenities],
                'accommodates': [accommodates],
                'bathrooms': [bathrooms],
                'bed_type': [bed_type],
                'cancellation_policy': [cancellation_policy],
                'cleaning_fee': [cleaning_fee],
                'city': [city],
                'host_has_profile_pic': [host_has_profile_pic],
                'host_identity_verified': [host_identity_verified],
                'host_response_rate': [host_response_rate],
                'instant_bookable': [instant_bookable],
                'neighbourhood': [neighbourhood],
                'number_of_reviews': [number_of_reviews],
                'review_scores_rating': [review_scores_rating],
                'bedrooms': [bedrooms],
                'beds': [beds]
            }
            
            df = pd.DataFrame(data)

            # Transform and predict
            transformed_data = preprocessor.transform(df)
            prediction = model.predict(transformed_data)
            
            # Convert log_price to actual price
            log_price = prediction[0]
            actual_price = round(np.exp(log_price), 2)
            
            return render_template("index.html", result=f"${actual_price}")

        except Exception as e:
            error_message = f"Error during prediction: {str(e)}"
            print(error_message)
            return render_template("index.html", result=f"Error: {error_message}")

    else:
        return render_template("index.html", result="")

# For Vercel serverless
app = app

# For local development
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)