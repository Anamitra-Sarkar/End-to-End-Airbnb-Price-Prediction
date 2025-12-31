import os
import sys
import numpy as np
import pandas as pd
from dataclasses import dataclass
from src.Airbnb.logger import logging
from catboost import CatBoostRegressor
from src.Airbnb.utils.utils import save_object
from src.Airbnb.exception import customexception
from sklearn.metrics import r2_score


@dataclass 
class ModelTrainerConfig:
    trained_model_file_path = os.path.join('Artifacts','Model.pkl')
    
    
class ModelTrainer:
    def __init__(self):
        self.model_trainer_config = ModelTrainerConfig()
    
    def initate_model_training(self,train_array,test_array):
        try:
            logging.info('Splitting Dependent and Independent variables from train and test data')
            X_train, y_train, X_test, y_test = (
                train_array[:,:-1],
                train_array[:,-1],
                test_array[:,:-1],
                test_array[:,-1]
            )

            # Use only CatBoost model for reduced memory footprint
            model = CatBoostRegressor(verbose=False)
            
            logging.info('Training CatBoost model')
            model.fit(X_train, y_train)
            
            # Evaluate model
            y_test_pred = model.predict(X_test)
            test_score = r2_score(y_test, y_test_pred)
            
            print(f'CatBoost Model R2 Score: {test_score}')
            print('\n====================================================================================\n')
            logging.info(f'CatBoost Model R2 Score: {test_score}')

            save_object(file_path=self.model_trainer_config.trained_model_file_path, obj=model)
          
        except Exception as e:
            logging.info('Exception occured at Model Training')
            raise customexception(e,sys)