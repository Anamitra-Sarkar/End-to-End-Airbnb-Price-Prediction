from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from src.Airbnb.pipelines.Prediction_Pipeline import CustomData, PredictPipeline
import numpy as np

app = Flask(__name__)
CORS(app)

# Health check endpoint
@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "Backend is running"})

# API endpoint for predictions (JSON)
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        json_data = request.get_json()
        
        if not json_data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        # Helper function for safe type conversion
        def safe_int(value, default):
            if value is None:
                return default
            try:
                return int(value)
            except (ValueError, TypeError):
                return default
        
        def safe_float(value, default):
            if value is None:
                return default
            try:
                return float(value)
            except (ValueError, TypeError):
                return default
        
        # Validate and convert form data to CustomData object
        data = CustomData(
            property_type=json_data.get("property_type") or "Apartment",
            room_type=json_data.get("room_type") or "Entire home/apt",
            amenities=safe_int(json_data.get("amenities"), 0),
            accommodates=safe_int(json_data.get("accommodates"), 1),
            bathrooms=safe_float(json_data.get("bathrooms"), 1.0),
            bed_type=json_data.get("bed_type") or "Real Bed",
            cancellation_policy=json_data.get("cancellation_policy") or "flexible",
            cleaning_fee=json_data.get("cleaning_fee") or "1",
            city=json_data.get("city") or "NYC",
            host_has_profile_pic=json_data.get("host_has_profile_pic") or "1",
            host_identity_verified=json_data.get("host_identity_verified") or "1",
            host_response_rate=safe_int(json_data.get("host_response_rate"), 100),
            instant_bookable=json_data.get("instant_bookable") or "0",
            latitude=safe_float(json_data.get("latitude"), 0.0),
            longitude=safe_float(json_data.get("longitude"), 0.0),
            number_of_reviews=safe_int(json_data.get("number_of_reviews"), 0),
            review_scores_rating=safe_int(json_data.get("review_scores_rating"), 90),
            bedrooms=safe_int(json_data.get("bedrooms"), 1),
            beds=safe_int(json_data.get("beds"), 1)
        )

        final_data = data.get_data_as_dataframe()

        # Make prediction
        predict_pipeline = PredictPipeline()
        pred = predict_pipeline.predict(final_data)
        
        # Convert log_price to actual price
        log_price = pred[0]
        actual_price = round(np.exp(log_price), 2)
        
        return jsonify({
            "success": True,
            "predicted_price": actual_price,
            "formatted_price": f"${actual_price}"
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Legacy form-based endpoint (kept for backward compatibility)
@app.route("/form", methods=["GET", "POST"])
def form():
    if request.method == "POST":
        try:
            # Validate and convert form data to CustomData object
            data = CustomData(
                property_type=request.form.get("property_type"),
                room_type=request.form.get("room_type"),
                amenities=int(request.form.get("amenities", 0)),
                accommodates=int(request.form.get("accommodates", 1)),
                bathrooms=float(request.form.get("bathrooms", 0)),
                bed_type=request.form.get("bed_type"),
                cancellation_policy=request.form.get("cancellation_policy"),
                cleaning_fee=request.form.get("cleaning_fee"),
                city=request.form.get("city"),
                host_has_profile_pic=request.form.get("host_has_profile_pic"),
                host_identity_verified=request.form.get("host_identity_verified"),
                host_response_rate=int(request.form.get("host_response_rate", 0)),
                instant_bookable=request.form.get("instant_bookable"),
                latitude=float(request.form.get("latitude", 0.0)),
                longitude=float(request.form.get("longitude", 0.0)),
                number_of_reviews=int(request.form.get("number_of_reviews", 0)),
                review_scores_rating=int(request.form.get("review_scores_rating", 0)),
                bedrooms=int(request.form.get("bedrooms", 0)),
                beds=int(request.form.get("beds", 0))
            )

            final_data = data.get_data_as_dataframe()

            # Make prediction
            predict_pipeline = PredictPipeline()
            pred = predict_pipeline.predict(final_data)
            
            # Convert log_price to actual price
            log_price = pred[0]
            actual_price = round(np.exp(log_price), 2)
            
            return render_template("index.html", result=f"${actual_price}")

        except Exception as e:
            # Handle exceptions gracefully
            error_message = f"Error during prediction: {str(e)}"
            return render_template("error.html", error_message=error_message)

    else:
        # Render the initial page
        return render_template("index.html", result="")

# Execution begins
if __name__ == '__main__':
    import os
    # Only enable debug mode if explicitly set via environment variable
    debug_mode = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    app.run(host="0.0.0.0", port=10000, debug=debug_mode)
