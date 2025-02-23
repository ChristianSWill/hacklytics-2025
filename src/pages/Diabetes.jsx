import React, { useState } from "react";
import axios from "axios";

import Questions from "../components/Questions";

const Diabetes = () => {
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  function getDiabetesData() {
    setLoading(true);
    const bodyMassIndex =
      (Number(formData.weight) /
        (Number(formData["height-ft"]) * 12 + Number(formData["height-in"])) **
          2) *
      703;

    const DPF =
      Number(formData.num_siblings) +
      (Number(formData.mom_age) + Number(formData.dad_age)) / 12 +
      Number(formData.grandparents_age) / 12;

    const params = {
      Pregnancies: Number(formData.pregnancies),
      BloodPressure: Number(formData.diastolic_bp),
      BMI: bodyMassIndex,
      DiabetesPedigreeFunction: DPF,
      Age: Number(formData.age),
    };

    axios
      .post(`http://127.0.0.1:5000/diabetes`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRisk(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getDiabetesData();
  }

  return (
    <main className="main">
      <form className="questions" onSubmit={handleSubmit}>
        <h2>
          Enter your information to find out your risk of Type One Diabetes
        </h2>
        <div className="question-wrapper">
          <Questions
            label="Your Age"
            placeholder="30"
            type="number"
            onChange={handleChange}
            name="age"
          />
          <Questions
            label="Number of Pregnancies"
            placeholder="3"
            type="number"
            onChange={handleChange}
            name="pregnancies"
          />
          <Questions
            label="Diastolic blood pressure (bottom number)"
            placeholder="70"
            type="number"
            onChange={handleChange}
            name="diastolic_bp"
          />
          <Questions
            label="Weight (pounds)"
            placeholder="159"
            type="number"
            onChange={handleChange}
            name="weight"
          />
          <section className="question-card">
            <label className="question-label">Height (Feet' Inches"):</label>
            <div className="double-question">
              <input
                type="number"
                className="question-input"
                placeholder="5"
                required
                onChange={handleChange}
                name="height-ft"
              ></input>
              <input
                type="number"
                className="question-input"
                placeholder="7"
                required
                onChange={handleChange}
                name="height-in"
              ></input>
            </div>
          </section>
          <Questions
            label="Number of Siblings with Diabetes"
            placeholder="2"
            type="number"
            onChange={handleChange}
            name="num_sibs"
          />
          <Questions
            label="Age when Dad diagnosed"
            placeholder="56"
            type="number"
            onChange={handleChange}
            name="dad_age"
          />
          <Questions
            label="Age when Mom diagnosed"
            placeholder="58"
            type="number"
            onChange={handleChange}
            name="mom_age"
          />
          <Questions
            label="Age when a grandparent diagnosed"
            placeholder="49"
            type="number"
            onChange={handleChange}
            name="grandparents_age"
          />
        </div>
        <button className="question-submit">Calculate Risks</button>
      </form>
      <div className="risk">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            {risk ? (
              <>
                <h2 className="risk-header">Diabetes Risk:</h2>
                <div className="risk-percent">{risk["Percent Risk"]}</div>
                <p className="risk-text">
                  You have a <span>{risk["Prediction"]}</span> of getting Type
                  One Diabetes
                </p>
              </>
            ) : (
              <h2 className="risk-header">
                Find out your risk of Type One Diabetes
              </h2>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Diabetes;
