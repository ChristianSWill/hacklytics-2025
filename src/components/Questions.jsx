import React from "react";

const Questions = ({ label, placeholder }) => {
  return (
    <section className="question-card">
      <label className="question-label">{label}:</label>
      <input
        type="text"
        className="question-input"
        placeholder={placeholder}
      ></input>
    </section>
  );
};

export default Questions;
