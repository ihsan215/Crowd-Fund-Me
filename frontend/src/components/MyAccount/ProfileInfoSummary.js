import React from "react";
import CallProfileSumm from "./CallProfileSumm";

import "../../style/components/MyAccount/ProfileInfoSummary.css";

function ProfileInfoSummary() {
  return (
    <React.Fragment>
      <div className="general-profile-area">
        <div className="account-summary-area">
          <CallProfileSumm />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileInfoSummary;
