import joblib
import numpy as np

# Load trained model & scaler
rf = joblib.load("random_forest_diabetes.pkl")
scaler = joblib.load("scaler.pkl")

# Example user input
user_input = np.array([[3, 120, 70, 20, 80, 25.5, 0.5, 30]])

# Scale user input (same transformation as training)
user_input_scaled = scaler.transform(user_input)

# Make prediction
risk_percentage = rf.predict_proba(user_input_scaled)[:, 1] * 100
prediction = rf.predict(user_input_scaled)

# Output result
print(f"Predicted Diabetes Risk: {risk_percentage[0]:.2f}%")
print(f"Prediction: {'Diabetic' if prediction[0] == 1 else 'Not Diabetic'}")