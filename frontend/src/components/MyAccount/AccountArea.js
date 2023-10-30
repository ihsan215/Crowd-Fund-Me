import React from "react";
import "../../style/components/MyAccount/AccountArea.css";

import AccountGeneralProfile from "./AccountGeneralProfile";

function AccountArea() {
  return (
    <React.Fragment>
      <div className="account-page-area">
        <div className="account-general_profile-area account-area__border">
          <AccountGeneralProfile />
        </div>
        <div className="account-area account-area__border">
          <div className="account-summary_info">
            <p>General Profile Summary</p>
          </div>
          <div className="account_info">
            <p>General Profile Info</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountArea;
