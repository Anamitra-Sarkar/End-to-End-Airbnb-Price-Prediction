"""
Train Indian Model - AutoML Script for Indian Cities & Rupee Prices
This script generates synthetic Indian property data and trains multiple models
to find the best performer for Airbnb price prediction in India.
"""

import os
import pickle
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Configuration
RANDOM_STATE = 42
N_SAMPLES = 2000
OUTPUT_PATH = os.path.join("Artifacts", "Model.pkl")
PREPROCESSOR_PATH = os.path.join("Artifacts", "Preprocessor.pkl")

# Indian cities with their base price multipliers
CITIES = {
    "Mumbai": 1.5,      # Most expensive
    "Delhi": 1.3,
    "Bangalore": 1.25,
    "Chennai": 1.0,
    "Hyderabad": 1.0,
    "Kolkata": 0.85     # Least expensive
}

# Property types with price multipliers
PROPERTY_TYPES = {
    "Apartment": 1.0,
    "Villa": 1.8,
    "Bungalow": 1.6,
    "Studio": 0.7,
    "Heritage Haveli": 2.0,
    "Beach House": 1.9
}

# Room types
ROOM_TYPES = {
    "Entire home/apt": 1.0,
    "Private room": 0.6,
    "Shared room": 0.3
}

# Bed types
BED_TYPES = ["Real Bed", "Futon", "Pull-out Sofa", "Airbed", "Couch"]

# Cancellation policies
CANCELLATION_POLICIES = ["flexible", "moderate", "strict", "super_strict_30", "super_strict_60"]


def generate_synthetic_data(n_samples: int = N_SAMPLES) -> pd.DataFrame:
    """
    Generate synthetic Indian property data matching the columns expected by app.py.
    
    The app.py expects these columns:
    - property_type, room_type, amenities, accommodates, bathrooms, bed_type
    - cancellation_policy, cleaning_fee, city, host_has_profile_pic, host_identity_verified
    - host_response_rate, instant_bookable, latitude, longitude, number_of_reviews
    - review_scores_rating, bedrooms, beds
    """
    np.random.seed(RANDOM_STATE)
    
    data = []
    
    for _ in range(n_samples):
        # Random selections
        city = np.random.choice(list(CITIES.keys()))
        property_type = np.random.choice(list(PROPERTY_TYPES.keys()))
        room_type = np.random.choice(list(ROOM_TYPES.keys()))
        bed_type = np.random.choice(BED_TYPES)
        cancellation_policy = np.random.choice(CANCELLATION_POLICIES)
        
        # Numeric features
        bedrooms = np.random.randint(1, 6)  # 1-5 bedrooms
        beds = max(bedrooms, np.random.randint(1, 8))  # At least as many beds as bedrooms
        bathrooms = np.random.choice([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0])
        accommodates = np.random.randint(1, 17)  # 1-16 guests
        amenities = np.random.randint(5, 50)  # Number of amenities
        
        # Host features
        host_response_rate = np.random.randint(50, 101)  # 50-100%
        host_has_profile_pic = np.random.choice(["t", "f"], p=[0.9, 0.1])
        host_identity_verified = np.random.choice(["t", "f"], p=[0.8, 0.2])
        instant_bookable = np.random.choice(["t", "f"], p=[0.6, 0.4])
        cleaning_fee = np.random.choice(["True", "False"], p=[0.7, 0.3])
        
        # Review features
        number_of_reviews = np.random.randint(0, 500)
        review_scores_rating = np.random.randint(60, 101)
        
        # Location coordinates (approximate for Indian cities)
        city_coords = {
            "Mumbai": (19.0760, 72.8777),
            "Delhi": (28.7041, 77.1025),
            "Bangalore": (12.9716, 77.5946),
            "Chennai": (13.0827, 80.2707),
            "Hyderabad": (17.3850, 78.4867),
            "Kolkata": (22.5726, 88.3639)
        }
        base_lat, base_lon = city_coords[city]
        latitude = base_lat + np.random.uniform(-0.1, 0.1)
        longitude = base_lon + np.random.uniform(-0.1, 0.1)
        
        # Calculate price in INR (₹2,500 - ₹50,000)
        base_price = 5000  # Base price in INR
        
        # Apply multipliers
        price = base_price
        price *= CITIES[city]
        price *= PROPERTY_TYPES[property_type]
        price *= ROOM_TYPES[room_type]
        
        # Bedroom/bed adjustments
        price *= (1 + 0.15 * (bedrooms - 1))  # Each extra bedroom adds 15%
        price *= (1 + 0.05 * (accommodates - 2))  # Each extra guest capacity adds 5%
        
        # Amenity bonus
        price *= (1 + 0.005 * amenities)
        
        # Review score bonus
        if review_scores_rating >= 90:
            price *= 1.1
        elif review_scores_rating >= 80:
            price *= 1.05
        
        # Add some random noise
        price *= np.random.uniform(0.85, 1.15)
        
        # Clamp to range
        price = np.clip(price, 2500, 50000)
        
        # Calculate log_price (as used in the original model)
        log_price = np.log(price)
        
        data.append({
            "property_type": property_type,
            "room_type": room_type,
            "amenities": amenities,
            "accommodates": accommodates,
            "bathrooms": bathrooms,
            "bed_type": bed_type,
            "cancellation_policy": cancellation_policy,
            "cleaning_fee": cleaning_fee,
            "city": city,
            "host_has_profile_pic": host_has_profile_pic,
            "host_identity_verified": host_identity_verified,
            "host_response_rate": host_response_rate,
            "instant_bookable": instant_bookable,
            "latitude": latitude,
            "longitude": longitude,
            "number_of_reviews": number_of_reviews,
            "review_scores_rating": review_scores_rating,
            "bedrooms": bedrooms,
            "beds": beds,
            "log_price": log_price
        })
    
    return pd.DataFrame(data)


def create_preprocessor():
    """
    Create the preprocessing pipeline with OneHotEncoder for categorical features.
    """
    numerical_cols = [
        'amenities', 'accommodates', 'bathrooms', 'latitude', 'longitude',
        'host_response_rate', 'number_of_reviews', 'review_scores_rating', 'bedrooms', 'beds'
    ]
    
    categorical_cols = [
        'property_type', 'room_type', 'bed_type', 'cancellation_policy',
        'cleaning_fee', 'city', 'host_has_profile_pic', 'host_identity_verified', 'instant_bookable'
    ]
    
    # Numerical Pipeline
    num_pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    # Categorical Pipeline with OneHotEncoder
    cat_pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer([
        ('num_pipeline', num_pipeline, numerical_cols),
        ('cat_pipeline', cat_pipeline, categorical_cols)
    ])
    
    return preprocessor


def train_and_compare_models(X_train, X_test, y_train, y_test):
    """
    Train multiple models and compare their R² scores.
    Returns the best model name and model object.
    """
    models = {
        "RandomForestRegressor": RandomForestRegressor(
            n_estimators=100,
            max_depth=15,
            random_state=RANDOM_STATE,
            n_jobs=-1
        ),
        "GradientBoostingRegressor": GradientBoostingRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=RANDOM_STATE
        ),
        "LinearRegression": LinearRegression()
    }
    
    results = {}
    
    print("\n" + "=" * 60)
    print("MODEL BATTLE - Training and Comparing Models")
    print("=" * 60)
    
    for name, model in models.items():
        print(f"\n Training {name}...")
        model.fit(X_train, y_train)
        
        # Predict
        y_pred = model.predict(X_test)
        
        # Calculate R² score
        r2 = r2_score(y_test, y_pred)
        results[name] = {"model": model, "r2_score": r2}
        
        print(f"   R² Score: {r2:.4f}")
    
    # Find best model
    best_model_name = max(results, key=lambda x: results[x]["r2_score"])
    best_model = results[best_model_name]["model"]
    best_r2 = results[best_model_name]["r2_score"]
    
    print("\n" + "=" * 60)
    print(f"🏆 WINNER: {best_model_name} with R² = {best_r2:.4f}")
    print("=" * 60)
    
    return best_model_name, best_model, best_r2


def main():
    """
    Main execution function.
    """
    print("\n" + "=" * 60)
    print("🇮🇳 INDIAN AIRBNB PRICE PREDICTION - AutoML Training")
    print("=" * 60)
    
    # Step 1: Generate synthetic data
    print("\n📊 Step 1: Generating Synthetic Indian Property Data...")
    df = generate_synthetic_data(N_SAMPLES)
    print(f"   Generated {len(df)} samples")
    print(f"   Cities: {df['city'].unique().tolist()}")
    print(f"   Price Range: ₹{np.exp(df['log_price'].min()):.0f} - ₹{np.exp(df['log_price'].max()):.0f}")
    
    # Step 2: Prepare features and target
    print("\n🔧 Step 2: Preparing Features...")
    X = df.drop(columns=['log_price'])
    y = df['log_price']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE
    )
    print(f"   Training samples: {len(X_train)}")
    print(f"   Testing samples: {len(X_test)}")
    
    # Step 3: Create and fit preprocessor
    print("\n⚙️  Step 3: Creating Preprocessing Pipeline...")
    preprocessor = create_preprocessor()
    
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)
    print(f"   Processed feature count: {X_train_processed.shape[1]}")
    
    # Step 4: Train and compare models
    print("\n🤖 Step 4: Training Models...")
    best_model_name, best_model, best_r2 = train_and_compare_models(
        X_train_processed, X_test_processed, y_train, y_test
    )
    
    # Step 5: Save the best model and preprocessor
    print("\n💾 Step 5: Saving Best Model and Preprocessor...")
    
    # Create Artifacts directory if it doesn't exist
    os.makedirs("Artifacts", exist_ok=True)
    
    # Save the model
    with open(OUTPUT_PATH, 'wb') as f:
        pickle.dump(best_model, f)
    print(f"   Model saved to: {OUTPUT_PATH}")
    
    # Save the preprocessor
    with open(PREPROCESSOR_PATH, 'wb') as f:
        pickle.dump(preprocessor, f)
    print(f"   Preprocessor saved to: {PREPROCESSOR_PATH}")
    
    # Final summary
    print("\n" + "=" * 60)
    print("✅ TRAINING COMPLETE!")
    print("=" * 60)
    print(f"   Best Model: {best_model_name}")
    print(f"   R² Score: {best_r2:.4f}")
    print(f"   Model Path: {OUTPUT_PATH}")
    print(f"   Preprocessor Path: {PREPROCESSOR_PATH}")
    print("\n   The model is now ready for deployment!")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
