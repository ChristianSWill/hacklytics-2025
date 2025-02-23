import React from "react";

const Questions = ({ label, placeholder, type, onChange, name }) => {
  return (
    <section className="question-card">
      <label className="question-label">{label}:</label>
      <input
        type={type || "text"}
        className="question-input"
        placeholder={placeholder}
        required
        onChange={onChange}
        name={name}
      ></input>
    </section>
  );
};

export default Questions;
