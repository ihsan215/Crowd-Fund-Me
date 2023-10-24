import React from "react";

import "./Switch.css";

function Switch({ name, onChange, index, className }) {
  return (
    <React.Fragment>
      <div className={`form-check form-switch ${className}`}>
        <input
          className={`form-check-input custom-switch `}
          type="checkbox"
          role="switch"
          name={name}
          onChange={onChange}
          index={index}
          style={{ marginRight: "10px" }}
        />
        <label class="form-check-label" for={name}>
          {name}
        </label>
      </div>
    </React.Fragment>
  );
}

export default Switch;
