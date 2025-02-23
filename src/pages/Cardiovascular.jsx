import axios from "axios";
import React, { useState } from "react";

import Questions from "../components/Questions";
import Dropdown from "../components/Dropdown";

const Cardiovascular = () => {
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  function getCardiovascularData() {
    setLoading(true);
    const cmHeight =
      (Number(formData["height-ft"]) * 12 + Number(formData["height-in"])) *
      2.54;

    const kgWeight = Number(formData.weight) / 2.205;

    const params = {
      age: Number(formData.age),
      gender: Number(formData.gender),
      height: cmHeight,
      weight: kgWeight,
      ap_hi: Number(formData.ap_hi),
      ap_lo: Number(formData.ap_lo),
      cholesterol: Number(formData.cholesterol),
      smoke: Number(formData.smokes),
      alco: Number(formData.drinks),
      active: Number(formData.active),
    };

    axios
      .post(`http://127.0.0.1:5000/heart-disease`, params, {
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
    getCardiovascularData();
  }

  return (
    <main className="main">
      <form className="questions" onSubmit={handleSubmit}>
        <h2>
          Enter your information to find out your risk of having Cardiovascular
          Disease
        </h2>
        <div className="question-wrapper">
          <Dropdown
            label="Your gender"
            values={["", "Female", "Male"]}
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
          <Questions
            label="Systolic Blood Pressure (top number)"
            placeholder="120"
            type="number"
            onChange={handleChange}
            name="ap_hi"
          />
          <Questions
            label="Diastolic blood pressure (bottom number)"
            placeholder="80"
            type="number"
            onChange={handleChange}
            name="ap_lo"
          />
          <Dropdown
            label="What is your cholesterol level?"
            values={[
              "",
              "Normal (200 mg/dL)",
              "Slightly Above Normal (>200)",
              "High Cholesterol (>240)",
            ]}
            onChange={handleChange}
            name="cholesterol"
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
            values={["No", "Yes"]}
            onChange={handleChange}
            name="smokes"
          />
          <Dropdown
            label="Do you drink alcohol?"
            values={["No", "Yes"]}
            onChange={handleChange}
            name="drinks"
          />
          <Dropdown
            label="Are you physically active"
            values={["No", "Yes"]}
            onChange={handleChange}
            name="active"
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
                <h2 className="risk-header">Cardiovascular Disease Risk:</h2>
                <div className="risk-percent">{risk["Percent Risk"]}</div>
                <p className="risk-text">
                  You have a <span>{risk["Prediction"]}</span> of having
                  cardiovascular disease
                </p>
              </>
            ) : (
              <h2 className="risk-header">
                Find out your risk of having Cardiovascular Disease
              </h2>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Cardiovascular;
