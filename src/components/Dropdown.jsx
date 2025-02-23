import React from "react";

const Dropdown = ({ label, values, onChange, name }) => {
  return (
    <section className="dropdown-card">
      <label className="dropdown-label">{label}:</label>
      <select
        className="dropdown-select"
        defaultValue=""
        onChange={onChange}
        name={name}
        required
      >
        <option value="" disabled>
          pick one
        </option>
        {values.map((opt, index) => {
          return (
            <option value={index} key={index}>
              {opt}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default Dropdown;
