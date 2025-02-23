import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, log_loss, classification_report
)

def createDiabetesModel():
    # Read in Dataframe
    diabetes = pd.read_csv('diabetes.csv')

    # Initialize X and y variables
    X = diabetes[['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']]
    y = diabetes['Outcome']

    # Separate into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 38)

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Train model
    rf = RandomForestClassifier(n_estimators=1000,max_leaf_nodes=35, random_state=38)
    rf.fit(X_train_scaled, y_train)

    joblib.dump(rf, 'random_forest_diabetes.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    return joblib.load("random_forest_diabetes.pkl"), joblib.load("scaler.pkl")
    # Get risk percentage for training and testing
    # risk_percentages_test = rf.predict_proba(X_test_scaled)[:, 1]
    # risk_percentages_train = rf.predict_proba(X_train_scaled)[:, 1]

    # Copy the original unscaled data
    # X_train_w_risk = X_train.copy()
    # X_test_w_risk = X_test.copy()

    # Add the y-value to the dataframes
    # X_train_w_risk['Outcome'] = y_train
    # X_train_w_risk['Risk_Percentage'] = risk_percentages_train * 100

    # X_test_w_risk['Outcome'] = y_test
    # X_test_w_risk['Risk_Percentage'] = risk_percentages_test * 100

    # Performance Metric
    # roc_auc_score(y_test, risk_percentages_test)

    # Save as csv
    # X_train_w_risk.to_csv('diabetes_training_with_outcome_and_risk.csv', index=False)
    # X_test_w_risk.to_csv('diabetes_test_with_outcome_and_risk.csv', index=False)

def createStrokeModel():
    # Read in Dataframe
    stroke = pd.read_csv('healthcare-dataset-stroke-data.csv')
    stroke = pd.get_dummies(stroke)
    
    # Initialize X and y variables
    X = stroke.drop('stroke')
    y = stroke['stroke']

    # Separate into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 38)

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Train model
    rf = RandomForestClassifier(n_estimators=1000,max_leaf_nodes=35, random_state=38)
    rf.fit(X_train_scaled, y_train)

    joblib.dump(rf, 'random_forest_stroke.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    return joblib.load("random_forest_stroke.pkl"), joblib.load("scaler.pkl")
if __name__ == "__main__":
    createDiabetesModel()