import React from "react";
import Questions from "../components/Questions";

const Diabetes = () => {
  return (
    <main className="main">
      <div className="questions">
        <div className="question-wrapper">
          <Questions label="Number of Pregnancies" placeholder="2" />
          <Questions label="Number of Pregnancies" placeholder="2" />
          <Questions label="Number of Pregnancies" placeholder="2" />
          <Questions label="Number of Pregnancies" placeholder="2" />
          <Questions label="Number of Pregnancies" placeholder="2" />
        </div>
        <button className="question-submit">Calculate Risks</button>
      </div>
      <div className="risk">Risks</div>
    </main>
  );
};

export default Diabetes;
