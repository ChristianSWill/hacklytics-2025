from flask import Flask, request, jsonify
import joblib
import numpy as np
from model_code import createDiabetesModel, createStrokeModel

app = Flask(__name__)
diabetesModel, diabetesScalar = createDiabetesModel()
strokeModel, strokeScalar = createStrokeModel()

@app.route("/diabetes", methods=["POST"])
def diabetesAssessment():
    data = request.json
    user_input = np.array([[data['Pregnancies'], data['BloodPressure'], data['BMI'], data['DiabetesPedigreeFunction'], data['Age']]])

    # Scale user input (same transformation as training)
    user_input_scaled = diabetesScalar.transform(user_input)

    # Make prediction
    risk_percentage = diabetesModel.predict_proba(user_input_scaled)[:, 1] * 100
    prediction = diabetesModel.predict(user_input_scaled)

    # Output result
    return jsonify({"Percent Risk": f"{risk_percentage[0]:.2f}%", "Prediction": f"{'Diabetic' if prediction[0] == 1 else 'Not Diabetic'}"})

@app.route("/stroke", methods=["POST"])
def strokeAssessment():
    data = request.json
    user_input = np.array([[data['gender'], data['age'], data['hypertension'], data['heart_disease'], data['ever_married'], data['residence_type'], data['bmi'], data['smoking_status']]])

    # Scale user input (same transformation as training)
    user_input_scaled = strokeScalar.transform(user_input)

    # Make prediction
    risk_percentage = strokeModel.predict_proba(user_input_scaled)[:, 1] * 100
    prediction = strokeModel.predict(user_input_scaled)

    # Output result
    return jsonify({"Percent Risk": f"{risk_percentage[0]:.2f}%", "Prediction": f"{'Stroke' if prediction[0] == 1 else 'Not likely to have a stroke'}"})

if __name__ == "__main__":
    app.run(debug=True)
