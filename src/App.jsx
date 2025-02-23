import React from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router";
import Diabetes from "./pages/Diabetes";
import Stroke from "./pages/Stroke";
import Cardiovascular from "./pages/Cardiovascular";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Diabetes />} />
        <Route path="/stroke" element={<Stroke />} />
        <Route path="/cardiovascular" element={<Cardiovascular />} />
      </Routes>
    </div>
  );
};

export default App;
