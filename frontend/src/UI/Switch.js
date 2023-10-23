import React from "react";

import "./Switch.css";

function Switch({ name, onChange, index }) {
  return (
    <React.Fragment>
      <div class="form-check form-switch">
        <input
          class="form-check-input custom-switch"
          type="checkbox"
          role="switch"
          name={name}
          onChange={onChange}
          index={index}
        />
        <label class="form-check-label" for={name}>
          {name}
        </label>
      </div>
    </React.Fragment>
  );
}

export default Switch;
