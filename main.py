from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from model_code import createDiabetesModel, createStrokeModel, createCardiovascularDiseaseModel

app = Flask(__name__)
diabetesModel, diabetesScalar = createDiabetesModel()
strokeModel, strokeScalar = createStrokeModel()
cardioModel, cardioScalar = createCardiovascularDiseaseModel()

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
    return jsonify({
        "Percent Risk": f"{risk_percentage[0]:.2f}%",
        "Prediction": (
            "high risk" if risk_percentage[0] >= 0.6 else
            "moderate risk" if risk_percentage[0] >= 0.4 else
            "low risk"
        )
    })
@app.route("/stroke", methods=["POST"])
def strokeAssessment():
    data = request.json
    user_input = np.array([[data['gender'], data['age'], data['hypertension'], data['heart_disease'], data['ever_married'], data['work_type'], data['residence_type'], data['bmi'], data['smoking_status']]])
    # Scale user input (same transformation as training)
    user_input_scaled = strokeScalar.transform(user_input)

    # Make prediction
    risk_percentage = strokeModel.predict_proba(user_input_scaled)[:, 1] * 100
    prediction = strokeModel.predict(user_input_scaled)

    # Output result
    return jsonify({
    "Percent Risk": f"{risk_percentage[0]:.2f}%",
    "Prediction": (
        "high risk" if risk_percentage[0] >= 0.4 else
        "moderate risk" if risk_percentage[0] >= 0.2 else
        "low risk"
    )
    })
@app.route("/heart-disease", methods=["POST"])
def cardioAssessment():
    data = request.json
    user_input = np.array([[data['age'], data['gender'], data['height'], data['weight'], data['ap_hi'], data['ap_lo'], data['cholesterol'], data['smoke'], data['alco'], data['active']]])
    # Scale user input (same transformation as training)
    user_input_scaled = cardioScalar.transform(user_input)

    # Make prediction
    risk_percentage = cardioModel.predict_proba(user_input_scaled)[:, 1] * 100
    prediction = cardioModel.predict(user_input_scaled)

    # Output result
    return jsonify({
        "Percent Risk": f"{risk_percentage[0]:.2f}%",
        "Prediction": (
            "high risk" if risk_percentage[0] >= 0.6 else
            "moderate risk" if risk_percentage[0] >= 0.4 else
            "low risk"
        )
    })
if __name__ == "__main__":
    app.run(debug=True)
