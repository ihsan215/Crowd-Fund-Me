import React from "react";

import imgSrc from "../../style/img/homepage_1.svg";

function Intro() {
  return (
    <React.Fragment>
      <div
        className="container main-area intro-area"
        style={{ padding: "3% 2%" }}
      >
        <div className="row">
          <div className="col-lg">
            <img src={imgSrc} alt="crowfundImg" />
          </div>

          <div className="col-lg">
            <div className="title">
              <h1>Fueling Innovation, One Blockchain at a Time.</h1>
            </div>
            <div className="text-area">
              <p>
                Welcome to CrowdFundMe, where innovation meets opportunity.
                We're a decentralized crowdfunding platform leveraging the
                Ethereum blockchain to bring creators and backers together in a
                secure, transparent, and trustless environment. Join us in
                fueling the future of groundbreaking projects and ideas. Let's
                create, collaborate, and disrupt the norm!
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Intro;
