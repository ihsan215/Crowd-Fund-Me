import React from "react";

import imgSrc from "../../style/img/projectInfo.png";

function ProjectInfo() {
  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          marginTop: "7rem",
          marginBottom: "5rem",
          backgroundColor: "red",
        }}
      >
        <div className="row">
          <div
            className="col-lg-5 d-flex-c"
            style={{
              backgroundColor: "#202020",
              color: "aliceblue",
              padding: "4%",
            }}
          >
            <h3 style={{ textAlign: "justify" }}>
              <span style={{ color: "rgb(255,216,0)" }}>CrowdFundMe</span>
              &nbsp; ensures a smooth project initiation bolstered by robust
              decentralized application security, guaranteeing an unparalleled
              crowdfunding experience.
            </h3>
          </div>
          <div
            className="col-lg-7 d-flex-c"
            style={{
              textAlign: "right",
              padding: "0",
              backgroundColor: "red",
            }}
          >
            <img src={imgSrc} alt="bg" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProjectInfo;
