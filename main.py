from flask import Flask, request, jsonify
import joblib
import numpy as np
from model_code import createDiabetesModel

app = Flask(__name__)
diabetesModel, diabetesScalar = createDiabetesModel()

@app.route("/diabetes", methods=["POST"])
def diabetesAssessment():
    data = request.json
    user_input = np.array([[data['Pregnancies'], data['Glucose'], data['BloodPressure'], data['SkinThickness'], data['Insulin'], data['BMI'], data['DiabetesPedigreeFunction'], data['Age']]])

    # Scale user input (same transformation as training)
    user_input_scaled = diabetesScalar.transform(user_input)

    # Make prediction
    risk_percentage = diabetesModel.predict_proba(user_input_scaled)[:, 1] * 100
    prediction = diabetesModel.predict(user_input_scaled)

    # Output result
    print(f"Predicted Diabetes Risk: {risk_percentage[0]:.2f}%")
    print(f"Prediction: {'Diabetic' if prediction[0] == 1 else 'Not Diabetic'}")
    return jsonify({"Diabetes Percent Risk": f"{risk_percentage[0]:.2f}%", "Prediction": f"{'Diabetic' if prediction[0] == 1 else 'Not Diabetic'}"})

if __name__ == "__main__":
    app.run(debug=True)
