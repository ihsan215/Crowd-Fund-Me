import React from "react";

function GeneralInfo() {
  return (
    <React.Fragment>
      <div className="container  main-area" style={{ marginTop: 5 + "rem" }}>
        <div className="row summary">
          <div className="col summary-info">
            <h1>45</h1>
            <p>projects funded</p>
          </div>
          <div className="col summary-info">
            <h1>45 ETH</h1>
            <p>foundation</p>
          </div>
          <div className="col summary-info">
            <h1>45</h1>
            <p>sponsors</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GeneralInfo;
