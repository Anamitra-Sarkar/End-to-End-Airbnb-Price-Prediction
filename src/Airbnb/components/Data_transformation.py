import os
import sys
import pandas as pd
import numpy as np

from dataclasses import dataclass
from src.Airbnb.exception import customexception
from src.Airbnb.logger import logging

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder, StandardScaler

from src.Airbnb.utils.utils import save_object

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path = os.path.join('Artifacts', 'Preprocessor.pkl')


class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def get_data_transformation(self):
        try:
            logging.info('Data Transformation initiated')

            numerical_cols = ['amenities', 'accommodates', 'bathrooms', 'latitude', 'longitude', 
                            'host_response_rate', 'number_of_reviews', 'review_scores_rating', 'bedrooms', 'beds']
            categorical_cols = ['property_type', 'room_type', 'bed_type', 'cancellation_policy', 
                              'cleaning_fee', 'city', 'host_has_profile_pic', 'host_identity_verified', 'instant_bookable']

            # Define categories for ordinal encoding - order matters!
            property_type_cat = ['Apartment', 'House', 'Condominium', 'Townhouse', 'Loft', 'Other', 
                               'Guesthouse', 'Bed & Breakfast', 'Bungalow', 'Villa', 'Dorm', 
                               'Guest suite', 'Camper/RV', 'Timeshare', 'Cabin', 'In-law', 'Hostel', 
                               'Boutique hotel', 'Boat', 'Serviced apartment', 'Tent', 'Castle', 
                               'Vacation home', 'Yurt', 'Hut', 'Treehouse', 'Chalet', 'Earth House', 
                               'Tipi', 'Train', 'Cave', 'Casa particular', 'Parking Space', 'Lighthouse', 'Island']
            room_type_cat = ['Entire home/apt', 'Private room', 'Shared room']
            bed_type_cat = ['Real Bed', 'Futon', 'Pull-out Sofa', 'Airbed', 'Couch']
            cancellation_policy_cat = ['strict', 'moderate', 'flexible', 'super_strict_30', 'super_strict_60']
            cleaning_fee_cat = ['True', 'False']
            city_cat = ['NYC', 'SF', 'DC', 'LA', 'Chicago', 'Boston']
            host_has_profile_pic_cat = ['t', 'f']
            host_identity_verified_cat = ['t', 'f']
            instant_bookable_cat = ['t', 'f']

            logging.info('Pipeline Initiated')

            # Numerical Pipeline
            num_pipeline = Pipeline(
                steps=[
                    ('imputer', SimpleImputer(strategy='median')),
                    ('scaler', StandardScaler())
                ]
            )

            # Categorical Pipeline
            cat_pipeline = Pipeline(
                steps=[
                    ('imputer', SimpleImputer(strategy='most_frequent')),
                    ('ordinalencoder', OrdinalEncoder(
                        categories=[
                            property_type_cat, 
                            room_type_cat, 
                            bed_type_cat, 
                            cancellation_policy_cat, 
                            cleaning_fee_cat, 
                            city_cat, 
                            host_has_profile_pic_cat, 
                            host_identity_verified_cat, 
                            instant_bookable_cat
                        ],
                        handle_unknown='use_encoded_value',
                        unknown_value=-1
                    )),
                    ('scaler', StandardScaler())
                ]
            )

            preprocessor = ColumnTransformer([
                ('num_pipeline', num_pipeline, numerical_cols),
                ('cat_pipeline', cat_pipeline, categorical_cols)
            ])

            return preprocessor

        except Exception as e:
            logging.info("Exception occurred in get_data_transformation")
            raise customexception(e, sys)

    def initialize_data_transformation(self, train_path, test_path):
        try:
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)

            logging.info("Read train and test data complete")
            logging.info(f'Train Dataframe Head : \n{train_df.head().to_string()}')
            logging.info(f'Test Dataframe Head : \n{test_df.head().to_string()}')

            preprocessing_obj = self.get_data_transformation()

            # Convert host_response_rate - handle NaN values properly
            def convert_response_rate(x):
                if pd.isna(x) or str(x).lower() == 'nan' or str(x) == '':
                    return np.nan
                try:
                    return float(str(x).replace('%', ''))
                except:
                    return np.nan

            train_df['host_response_rate'] = train_df['host_response_rate'].apply(convert_response_rate)
            test_df['host_response_rate'] = test_df['host_response_rate'].apply(convert_response_rate)

            logging.info("Host Response Rate converted to numeric")

            target_column_name = 'log_price'
            drop_columns = [target_column_name, 'id', 'name', 'description', 'first_review', 
                          'host_since', 'last_review', 'neighbourhood', 'thumbnail_url', 'zipcode']

            # Handle amenities column - count number of amenities
            def count_amenities(x):
                if pd.isna(x) or str(x) == '{}' or str(x) == '':
                    return 0
                return len(str(x).split(','))

            train_df['amenities'] = train_df['amenities'].apply(count_amenities)
            test_df['amenities'] = test_df['amenities'].apply(count_amenities)

            logging.info("Amenities column processed")

            # Convert cleaning_fee to string format expected by encoder
            train_df['cleaning_fee'] = train_df['cleaning_fee'].astype(str)
            test_df['cleaning_fee'] = test_df['cleaning_fee'].astype(str)

            # Drop columns that aren't needed
            input_feature_train_df = train_df.drop(columns=drop_columns, axis=1, errors='ignore')
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(columns=drop_columns, axis=1, errors='ignore')
            target_feature_test_df = test_df[target_column_name]

            logging.info(f'Input Feature Train Dataframe columns: {input_feature_train_df.columns.tolist()}')
            logging.info(f'Input Feature Train Dataframe dtypes:\n{input_feature_train_df.dtypes}')

            # Fit and transform
            input_feature_train_arr = preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr = preprocessing_obj.transform(input_feature_test_df)

            logging.info("Applying preprocessing object on training and testing datasets.")

            train_arr = np.c_[input_feature_train_arr, np.array(target_feature_train_df)]
            test_arr = np.c_[input_feature_test_arr, np.array(target_feature_test_df)]

            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )

            logging.info("Preprocessing pickle file saved")

            return (
                train_arr,
                test_arr
            )

        except Exception as e:
            logging.info("Exception occurred in initialize_data_transformation")
            raise customexception(e, sys)

