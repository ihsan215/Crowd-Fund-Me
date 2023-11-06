import React from "react";
import "../../style/components/MyAccount/AccountArea.css";

import AccountGeneralProfile from "./AccountGeneralProfile";
import ProfileInfoSummary from "./ProfileInfoSummary";
import GeneralProfileInfo from "./GeneralProfileInfo";

function AccountArea() {
  return (
    <React.Fragment>
      <div className="account-page-area">
        <div className="account-general_profile-area account-area__border">
          <AccountGeneralProfile />
        </div>
        <div className="account-area account-area__border">
          <div className="account-summary_info">
            <ProfileInfoSummary />
          </div>
          <div className="account_info">
            <GeneralProfileInfo />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountArea;