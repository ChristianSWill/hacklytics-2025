import React from "react";

import "../App.css";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-header">Healthy Hackers</h1>
      <ul className="navbar-list">
        <li>
          <NavLink to="/">Diabetes</NavLink>
        </li>
        <li>
          <NavLink to="/stroke">Stroke</NavLink>
        </li>
        <li>
          <NavLink to="/cardiovascular">Heart Disease</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
