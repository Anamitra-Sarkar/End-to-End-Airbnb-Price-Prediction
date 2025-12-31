import sys
import os

# Add the project root to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from src.Airbnb.components.Data_ingestion import DataIngestion
from src.Airbnb.components.Data_transformation import DataTransformation
from src.Airbnb.components.Model_trainer import ModelTrainer

if __name__ == "__main__":
    # Data Ingestion Pipeline
    obj = DataIngestion()
    train_data_path, test_data_path = obj.initiate_data_ingestion()

    # Data Transformation Pipeline
    data_transformation = DataTransformation()
    train_arr, test_arr = data_transformation.initialize_data_transformation(train_data_path, test_data_path)

    # Model Training Pipeline
    model_trainer_obj = ModelTrainer()
    model_trainer_obj.initate_model_training(train_arr, test_arr)