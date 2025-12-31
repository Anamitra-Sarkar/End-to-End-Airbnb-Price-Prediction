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
    
    MODEL_PATH = os.path.join(project_root, 'Artifacts', 'Model.pkl')
    PREPROCESSOR_PATH = os.path.join(project_root, 'Artifacts', 'Preprocessor.pkl')
    
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
                msg = "Error: Model or preprocessor not loaded. Please ensure model artifacts are available."
                if request.is_json:
                    return {"success": False, "error": msg}, 500
                return render_template("index.html", result=msg)
            
            # Determine source of data
            source = request.get_json() if request.is_json else request.form
            
            # Helper to get value
            def get_val(key, default):
                return source.get(key, default)

            # Get data with defaults
            property_type = get_val("property_type", "Apartment")
            room_type = get_val("room_type", "Entire home/apt")
            amenities = get_val("amenities", 0) # API expects simple int for now? 
            # Note: The original code used request.form.get("amenities", "") -> string
            # But app.py used safe_int(..., 0).
            # The original api/index.py used request.form.get("amenities", "")
            # And then: 'amenities': [amenities] -> usage in DataFrame.
            # If the model expects text features (e.g. CountVectorizer on amenities), string is correct.
            # If it expects a count, int is correct.
            # Looking at api/index.py line 137: 'amenities': [amenities]
            # And app.py line 45: amenities=safe_int(json_data.get("amenities"), 0)
            # This is a CONTRADICTION.
            # app.py treats amenities as INT. api/index.py treats it as STRING?
            # Let's look at lines 158: preprocessor.transform(df).
            # If the preprocessor handles text, string is right.
            # I will trust api/index.py existing logic which was: amenities = request.form.get("amenities", "")
            # So I will keep it as string/raw unless I see otherwise.
            
            amenities = get_val("amenities", "")
            
            # Handle numeric fields
            def safe_int(key, default=0):
                try:
                    val = get_val(key, default)
                    return int(val)
                except (ValueError, TypeError):
                    return default
            
            def safe_float(key, default=0.0):
                try:
                    val = get_val(key, default)
                    return float(val)
                except (ValueError, TypeError):
                    return default

            accommodates = safe_int("accommodates", 1)
            bathrooms = safe_float("bathrooms", 1.0)
            bed_type = get_val("bed_type", "Real Bed")
            cancellation_policy = get_val("cancellation_policy", "flexible")
            
            # Cleaning fee: form uses "1" for true?
            raw_cleaning = get_val("cleaning_fee", "1")
            if isinstance(raw_cleaning, bool):
                cleaning_fee = raw_cleaning
            else:
                cleaning_fee = str(raw_cleaning) == "1"

            city = get_val("city", "NYC")
            
            raw_host_pic = get_val("host_has_profile_pic", "1")
            host_has_profile_pic = raw_host_pic if isinstance(raw_host_pic, bool) else str(raw_host_pic) == "1"
            
            raw_host_ident = get_val("host_identity_verified", "1")
            host_identity_verified = raw_host_ident if isinstance(raw_host_ident, bool) else str(raw_host_ident) == "1"
            
            # Handle host_response_rate
            # Original: string "100" -> "100%"
            val_resp = get_val("host_response_rate", "100")
            if isinstance(val_resp, (int, float)):
                host_response_rate = f"{int(val_resp)}%"
            else:
                # It might already have % or be empty?
                # Try to parse number
                try:
                    clean_resp = str(val_resp).replace("%", "")
                    host_response_rate = f"{int(clean_resp)}%"
                except:
                    host_response_rate = "100%"
            
            raw_instant = get_val("instant_bookable", "1")
            instant_bookable = raw_instant if isinstance(raw_instant, bool) else str(raw_instant) == "1"
            
            neighbourhood = get_val("neighbourhood", "")
            
            number_of_reviews = safe_int("number_of_reviews", 0)
            review_scores_rating = safe_int("review_scores_rating", 0)
            bedrooms = safe_int("bedrooms", 0)
            beds = safe_int("beds", 0)

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
            
            if request.is_json:
                return {
                    "success": True,
                    "predicted_price": actual_price
                }

            return render_template("index.html", result=f"${actual_price}")

        except Exception as e:
            error_message = f"Error during prediction: {str(e)}"
            print(error_message)
            if request.is_json:
                return {"success": False, "error": error_message}, 500
            return render_template("index.html", result=f"Error: {error_message}")

    else:
        # GET request
        if request.is_json:
             return {"status": "Backend running"}
        return render_template("index.html", result="")

# For Vercel serverless
app = app

# For local development
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)