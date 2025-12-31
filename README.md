# End to End Airbnb Price Prediction

## Introduction
In today's fast-paced world, the way we travel and seek accommodations has undergone a remarkable transformation, thanks to platforms like Airbnb. This dynamic marketplace has empowered property owners and travellers, offering a diverse range of lodging options. However, one enduring challenge is setting the right price for a listing. Hosts aspire to optimize their earnings while ensuring competitive pricing, while guests seek value for their money. Balancing these interests can be intricate, and that's where the motivation for Airbnb price prediction comes in.

## Motivation 
To harness the power of data science and machine learning to provide more accurate and data-driven pricing strategies for Airbnb hosts and guests. By developing predictive models that factor in myriad variables such as location, property type, and market dynamics, the objective is to help hosts maximize their income and guests find fair deals. In this exploration of Airbnb price prediction, we will delve into methodologies, data sources, and emerging trends, shedding light on how technology is enhancing the overall Airbnb experience for both hosts and travellers.

## Features

- 🏠 **Property Type Support**: Apartment, House, Condominium, Villa, and 18+ more property types
- 🛏️ **Room Type Options**: Entire home/apt, Private room, Shared room
- 🌆 **Multi-City Support**: NYC, LA, SF, DC, Boston, Chicago
- 🎯 **Comprehensive Inputs**: Accommodates, bedrooms, beds, bathrooms, amenities
- 📊 **ML-Powered Predictions**: Uses advanced machine learning algorithms (CatBoost, XGBoost)
- 💰 **Real-Time Price Prediction**: Instant price estimates based on your inputs
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Live Demo

🌐 **Deployed on Vercel**: [Your Vercel URL will be here]

## Tech Stack

- **Backend**: Flask (Python)
- **ML Models**: CatBoost, XGBoost, Scikit-learn
- **Frontend**: HTML5, CSS3, JavaScript
- **Deployment**: Vercel Serverless Functions
- **Data Processing**: Pandas, NumPy

## Installation Guide

This guide provides step-by-step instructions on how to install and set up the Airbnb Price Prediction project. You can choose to install it either directly from GitHub, using Docker, or deploy to Vercel.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

 - Numpy
 - Pandas
 - Seaborn
 - Matplotlib
 - Scikit-learn
 - xgboost
 - Flask
 - Pillow
 - Catboost
 - DVC

### Installation Steps

#### Option 1: Installation from GitHub

Follow these steps to install and set up the project directly from the GitHub repository:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/projectsportfolio75-coder/End-to-End-Airbnb-Price-Prediction.git
   cd End-to-End-Airbnb-Price-Prediction
   ```

2. **Create a Virtual Environment** (Optional but recommended)
   ```bash
   conda create -p venv python==3.9 -y
   ```

3. **Activate the Virtual Environment**
   ```bash
   conda activate venv/
   ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Project**
   ```bash
   python app.py
   ```

6. **Access the Project**
   - Open your browser and navigate to `http://localhost:8080`

#### Option 2: Installation from DockerHub

If you prefer to use Docker:

1. **Pull the Docker Image**
   ```bash
   docker pull kalyan45/airbnb-app
   ```

2. **Run the Docker Container**
   ```bash
   docker run -p 5000:5000 kalyan45/airbnb-app
   ```

3. **Access the Project**
   - Open your browser and navigate to `http://localhost:5000`

#### Option 3: Deploy to Vercel

For serverless deployment to Vercel:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Clone and Navigate to Project**
   ```bash
   git clone https://github.com/projectsportfolio75-coder/End-to-End-Airbnb-Price-Prediction.git
   cd End-to-End-Airbnb-Price-Prediction
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Follow the Prompts**
   - Link to your Vercel account
   - Configure project settings
   - Wait for deployment to complete

5. **Access Your Deployed App**
   - Vercel will provide you with a production URL

## Usage

1. **Select Property Details**:
   - Choose property type (Apartment, House, etc.)
   - Select room type (Entire home/apt, Private room, Shared room)
   - Enter number of accommodates, bedrooms, beds, bathrooms

2. **Enter Location Information**:
   - Select city (NYC, LA, SF, DC, Boston, Chicago)
   - Enter neighbourhood (optional)

3. **Add Amenities & Policies**:
   - List amenities (TV, WiFi, Kitchen, etc.)
   - Select cancellation policy
   - Indicate cleaning fee availability

4. **Host Information**:
   - Host profile picture (Yes/No)
   - Host identity verified (Yes/No)
   - Host response rate (0-100%)

5. **Reviews & Bookings**:
   - Number of reviews
   - Review score rating (0-100)
   - Instant bookable option

6. **Get Prediction**:
   - Click "Predict Price" button
   - View the estimated Airbnb listing price

## Model Performance

The prediction model uses ensemble methods combining:
- **CatBoost**: For handling categorical features
- **XGBoost**: For gradient boosting
- **Feature Engineering**: Advanced preprocessing and transformation

## Project Structure

```
End-to-End-Airbnb-Price-Prediction/
├── api/
│   └── index.py              # Vercel serverless function
├── src/
│   └── Airbnb/
│       ├── components/       # Data ingestion, transformation, training
│       ├── pipelines/        # Training and prediction pipelines
│       └── utils/            # Utility functions
├── Artifacts/
│   ├── model.pkl             # Trained model
│   ├── preprocessor.pkl      # Data preprocessor
│   └── *.csv                 # Dataset files
├── templates/
│   └── index.html            # Web interface
├── static/
│   └── style.css             # Styling
├── Notebook_Experiments/     # Jupyter notebooks
├── vercel.json               # Vercel configuration
├── requirements.txt          # Python dependencies
├── app.py                    # Local Flask application
├── Dockerfile                # Docker configuration
└── README.md                 # Documentation
```

## Troubleshooting

### Common Issues

1. **Model not loading on Vercel**
   - Ensure `Artifacts/model.pkl` and `Artifacts/preprocessor.pkl` are committed to git
   - Check Vercel function memory limits (increased to 3008MB in config)

2. **Cold start timeouts**
   - First request may take longer (10-30 seconds)
   - Subsequent requests will be faster

3. **Local installation issues**
   - Ensure Python 3.9 is installed
   - Try upgrading pip: `pip install --upgrade pip`
   - For M1 Mac users, use: `pip install --no-cache-dir -r requirements.txt`

4. **Docker issues**
   - Ensure Docker daemon is running
   - Check port 5000 is not in use

### Getting Help

If you encounter any issues:
- Check the [Issues](https://github.com/projectsportfolio75-coder/End-to-End-Airbnb-Price-Prediction/issues) page
- Contact: `kalyanmurapaka274@gmail.com`

## API Endpoints

### Health Check
```
GET /health
```
Returns the health status of the application and model loading status.

### Home/Prediction
```
GET /
POST /
```
- **GET**: Displays the prediction form
- **POST**: Accepts form data and returns price prediction

## Environment Variables

For production deployment, you may want to set:

```bash
FLASK_ENV=production
MODEL_PATH=/path/to/model.pkl
PREPROCESSOR_PATH=/path/to/preprocessor.pkl
```

## Contributing

We welcome contributions from the community! If you have any ideas or suggestions for improving the project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- **Dataset**: Kaggle Airbnb Price Prediction dataset
- **ML Libraries**: Scikit-learn, CatBoost, XGBoost contributors
- **Deployment**: Vercel for serverless hosting
- **Framework**: Flask web framework
- **Data Processing**: Pandas and NumPy communities

## Author

**Hema Kalyan Murapaka**
- Email: kalyanmurapaka274@gmail.com
- GitHub: [@projectsportfolio75-coder](https://github.com/projectsportfolio75-coder)

## Citation

If you use this project in your research or work, please cite:

```bibtex
@software{airbnb_price_prediction,
  author = {Murapaka, Hema Kalyan},
  title = {End-to-End Airbnb Price Prediction},
  year = {2024},
  url = {https://github.com/projectsportfolio75-coder/End-to-End-Airbnb-Price-Prediction}
}
```

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
