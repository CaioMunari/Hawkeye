import React from "react";
import "./spinner.css";
const Spinner = ({ children, w, h }) => {
  return (
    <div style={{ width: w, height: h, zIndex: 2 }} className="loader">
      {children}
    </div>
  );
};

export default Spinner;
