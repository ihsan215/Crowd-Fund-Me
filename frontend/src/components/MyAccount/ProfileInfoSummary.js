import React from "react";

import "../../style/components/MyAccount/ProfileInfoSummary.css";

function ProfileInfoSummary() {
  return (
    <React.Fragment>
      <div className="general-profile-area">
        <div className="account-summary-area">
          <div className="summ-info-item">
            <h3>2</h3>
            <p>Total project</p>
          </div>
          <div className="summ-info-item">
            <h3>
              200 <span className="symbol">ETH</span>
            </h3>
            <p>Total Fund</p>
          </div>
          <div className="summ-info-item">
            <h3>
              110 <span className="symbol">ETH</span>
            </h3>
            <p>Total Donation</p>
          </div>
        </div>
        <div className="profile-link-area"></div>
      </div>
    </React.Fragment>
  );
}

export default ProfileInfoSummary;
