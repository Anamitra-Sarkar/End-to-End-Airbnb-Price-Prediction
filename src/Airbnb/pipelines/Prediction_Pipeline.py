import os
import numpy as np
import sys
import pandas as pd
from src.Airbnb.logger import logging
from src.Airbnb.utils.utils import load_object
from src.Airbnb.exception import customexception


class PredictPipeline:
    def __init__(self):
        pass
    
    def predict(self, features):
        try:
            preprocessor_path = os.path.join("Artifacts", "Preprocessor.pkl")
            model_path = os.path.join("Artifacts", "Model.pkl")
            preprocessor = load_object(preprocessor_path)
            model = load_object(model_path)
            logging.info('Preprocessor and Model Pickle files loaded')
            scaled_data = preprocessor.transform(features)
            logging.info('Data Scaled')
            pred = model.predict(scaled_data)
            return pred
        except Exception as e:
            raise customexception(e, sys)


class CustomData:
    def __init__(self,
                 property_type: str,
                 room_type: str,
                 amenities: int,
                 accommodates: int,
                 bathrooms: float,
                 bed_type: str,
                 cancellation_policy: str,
                 cleaning_fee: str,
                 city: str,
                 host_has_profile_pic: str,
                 host_identity_verified: str,
                 host_response_rate: int,
                 instant_bookable: str,
                 latitude: float,
                 longitude: float,
                 number_of_reviews: int,
                 review_scores_rating: int,
                 bedrooms: int,
                 beds: int):
        
        self.property_type = property_type
        self.room_type = room_type
        self.amenities = amenities
        self.accommodates = accommodates
        self.bathrooms = bathrooms
        self.bed_type = bed_type
        self.cancellation_policy = cancellation_policy
        self.cleaning_fee = cleaning_fee
        self.city = city
        self.host_has_profile_pic = host_has_profile_pic
        self.host_identity_verified = host_identity_verified
        self.host_response_rate = host_response_rate
        self.instant_bookable = instant_bookable
        self.latitude = latitude
        self.longitude = longitude
        self.number_of_reviews = number_of_reviews
        self.review_scores_rating = review_scores_rating
        self.bedrooms = bedrooms
        self.beds = beds

    def get_data_as_dataframe(self):
        try:
            # Map form values to expected data format
            cleaning_fee_map = {'1': 'True', '0': 'False', 'True': 'True', 'False': 'False'}
            host_pic_map = {'1': 't', '0': 'f', 't': 't', 'f': 'f'}
            host_verified_map = {'1': 't', '0': 'f', 't': 't', 'f': 'f'}
            instant_book_map = {'1': 't', '0': 'f', 't': 't', 'f': 'f'}
            
            # Map city names to match training data
            city_map = {
                'Boston': 'Boston',
                'Chicago': 'Chicago',
                'Washington, D.C.': 'DC',
                'DC': 'DC',
                'Los Angeles': 'LA',
                'LA': 'LA',
                'New York': 'NYC',
                'NYC': 'NYC',
                'San Francisco': 'SF',
                'SF': 'SF'
            }
            
            # Map room types to match training data
            room_type_map = {
                'Shared Room': 'Shared room',
                'Private Room': 'Private room',
                'Entire Home/Apt': 'Entire home/apt',
                'Shared room': 'Shared room',
                'Private room': 'Private room',
                'Entire home/apt': 'Entire home/apt'
            }
            
            # Map cancellation policy to match training data
            cancellation_map = {
                'Flexible': 'flexible',
                'Moderate': 'moderate',
                'Strict': 'strict',
                'Super strict': 'super_strict_30',
                'Advanced Super Strict': 'super_strict_60',
                'flexible': 'flexible',
                'moderate': 'moderate',
                'strict': 'strict',
                'super_strict_30': 'super_strict_30',
                'super_strict_60': 'super_strict_60'
            }
            
            # Column order must match the order used during training
            # Numerical: amenities, accommodates, bathrooms, latitude, longitude, host_response_rate, number_of_reviews, review_scores_rating, bedrooms, beds
            # Categorical: property_type, room_type, bed_type, cancellation_policy, cleaning_fee, city, host_has_profile_pic, host_identity_verified, instant_bookable
            
            custom_data_input_dict = {
                'amenities': [self.amenities],
                'accommodates': [self.accommodates],
                'bathrooms': [self.bathrooms],
                'latitude': [self.latitude],
                'longitude': [self.longitude],
                'host_response_rate': [self.host_response_rate],
                'number_of_reviews': [self.number_of_reviews],
                'review_scores_rating': [self.review_scores_rating],
                'bedrooms': [self.bedrooms],
                'beds': [self.beds],
                'property_type': [self.property_type],
                'room_type': [room_type_map.get(self.room_type, self.room_type)],
                'bed_type': [self.bed_type],
                'cancellation_policy': [cancellation_map.get(self.cancellation_policy, self.cancellation_policy)],
                'cleaning_fee': [cleaning_fee_map.get(str(self.cleaning_fee), 'True')],
                'city': [city_map.get(self.city, self.city)],
                'host_has_profile_pic': [host_pic_map.get(str(self.host_has_profile_pic), 't')],
                'host_identity_verified': [host_verified_map.get(str(self.host_identity_verified), 't')],
                'instant_bookable': [instant_book_map.get(str(self.instant_bookable), 'f')]
            }
            
            df = pd.DataFrame(custom_data_input_dict)
            logging.info('Dataframe Gathered')
            return df
        except Exception as e:
            logging.info('Exception Occurred in prediction pipeline')
            raise customexception(e, sys)
