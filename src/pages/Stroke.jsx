import axios from "axios";
import React, { useState } from "react";
import Questions from "../components/Questions";
import Dropdown from "../components/Dropdown";

const Stroke = () => {
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  function getStrokeData() {
    setLoading(true);
    const bodyMassIndex =
      (Number(formData.weight) /
        (Number(formData["height-ft"]) * 12 + Number(formData["height-in"])) **
          2) *
      703;

    const params = {
      gender: Number(formData.gender),
      age: Number(formData.age),
      hypertension: Number(formData.hypertension),
      heart_disease: Number(formData.heart_disease),
      ever_married: Number(formData.ever_married),
      work_type: Number(formData.work_type),
      residence_type: Number(formData.residence),
      bmi: bodyMassIndex,
      smoking_status: Number(formData.smokes),
    };

    axios
      .post(`http://127.0.0.1:5000/stroke`, params, {
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
    getStrokeData();
  }

  return (
    <main className="main">
      <form className="questions" onSubmit={handleSubmit}>
        <h2>Enter your information to find out your risk of having a stroke</h2>
        <div className="question-wrapper">
          <Dropdown
            label="Your gender"
            values={["Male", "Female"]}
            onChange={handleChange}
            name="gender"
          />
          <Questions
            label="Your age"
            placeholder="22"
            type="number"
            onChange={handleChange}
            name="age"
          />
          <Dropdown
            label="Do you currently have hypertension"
            values={["No", "Yes"]}
            onChange={handleChange}
            name="hypertension"
          />
          <Dropdown
            label="Do you currently have heart diseases"
            values={["No", "Yes"]}
            onChange={handleChange}
            name="heart_disease"
          />
          <Dropdown
            label="Have you ever been married"
            values={["No", "Yes"]}
            onChange={handleChange}
            name="ever_married"
          />
          <Dropdown
            label="What is your work? (Select children if you have kids)"
            values={[
              "Children",
              "Government Job",
              "Never Worked",
              "Company",
              "Self-Employeed",
            ]}
            onChange={handleChange}
            name="work_type"
          />
          <Dropdown
            label="What kind of area are you in"
            values={["Rural", "Urban"]}
            onChange={handleChange}
            name="residence"
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
          <Dropdown
            label="Do you smoke?"
            values={["Never Smoked", "Formerly Smoked", "Currently Smokes"]}
            onChange={handleChange}
            name="smokes"
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
                <h2 className="risk-header">Stroke Risk:</h2>
                <div className="risk-percent">{risk["Percent Risk"]}</div>
                <p className="risk-text">
                  You have a <span>{risk["Prediction"]}</span> of having a
                  stroke
                </p>
              </>
            ) : (
              <h2 className="risk-header">
                Find out your risk of having a Stroke
              </h2>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Stroke;
