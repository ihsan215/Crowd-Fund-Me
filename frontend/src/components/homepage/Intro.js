import React from "react";
import imgSrc from "../../style/img/img_1.png";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

function Intro() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="container main-area">
        <div className="row intro-area">
          <div className="col-lg d-flex-c" style={{ marginBottom: "1rem" }}>
            <div className="text-area">
              <h1>Fueling Innovation, One Blockchain at a Time.</h1>
              <p>
                Welcome to CrowdFundMe, where innovation meets opportunity.
                We're a decentralized crowdfunding platform leveraging the
                Ethereum blockchain to bring creators and backers together in a
                secure, transparent, and trustless environment. Join us in
                fueling the future of groundbreaking projects and ideas. Let's
                create, collaborate, and disrupt the norm!
              </p>
              <Button onClick={() => navigate("/learn-more")}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="col-lg  d-flex-c">
            <div className="img-area">
              <img src={imgSrc} alt="bg image" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Intro;
