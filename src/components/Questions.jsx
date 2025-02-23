import React from "react";

const Questions = ({ label, placeholder, type }) => {
  return (
    <section className="question-card">
      <label className="question-label">{label}:</label>
      <input
        type={type || "text"}
        className="question-input"
        placeholder={placeholder}
      ></input>
    </section>
  );
};

export default Questions;
