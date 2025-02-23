import React from "react";
import Questions from "../components/Questions";

const Diabetes = () => {
  return (
    <main className="main">
      <div className="questions">
        <h2>
          Enter your information to find out your risk of Type One Diabetes
        </h2>
        <div className="question-wrapper">
          <Questions
            label="Number of Pregnancies"
            placeholder="2"
            type="number"
          />
          <Questions
            label="Diastolic blood pressure (bottom number)"
            placeholder="80"
            type="number"
          />
          <Questions label="Weight (pounds)" placeholder="210" type="number" />
          <section className="question-card">
            <label className="question-label">Height (Feet' Inches"):</label>
            <div className="double-question">
              <input
                type="number"
                className="question-input"
                placeholder="6"
              ></input>
              <input
                type="number"
                className="question-input"
                placeholder="2"
              ></input>
            </div>
          </section>
          <Questions
            label="Number of Siblings with Diabetes"
            placeholder="2"
            type="number"
          />
          <Questions
            label="Age when Dad diagnosed"
            placeholder="56"
            type="number"
          />
          <Questions
            label="Age when Mom diagnosed"
            placeholder="58"
            type="number"
          />
          <Questions
            label="Age when Dad diagnosed"
            placeholder="56"
            type="number"
          />
          <Questions
            label="Age when a grandparent diagnosed"
            placeholder="49"
            type="number"
          />
        </div>
        <button className="question-submit">Calculate Risks</button>
      </div>
      <div className="risk">
        <h2 className="risk-header">Diabetes Risk:</h2>
        <div className="risk-percent">49%</div>
        <p className="risk-text">
          You have a <span>moderate risk</span> of getting Type One Diabetes
        </p>
      </div>
    </main>
  );
};

export default Diabetes;
