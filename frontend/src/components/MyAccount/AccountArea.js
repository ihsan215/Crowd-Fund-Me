import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../style/components/MyAccount/AccountArea.css";

import AccountGeneralProfile from "./AccountGeneralProfile";
import ProfileInfoSummary from "./ProfileInfoSummary";
import GeneralProfileInfo from "./GeneralProfileInfo";
import CreatedProjects from "./CreatedProjects";
import DonatedProjects from "./DonatedProjects";

import Button from "../../UI/Button";

function AccountArea() {
  const params = useParams();
  const { userId } = params;

  return (
    <React.Fragment>
      <div className="account-page-area">
        <div className="account-general_profile-area account-area__border">
          <AccountGeneralProfile userId={userId} />
        </div>
        <div className="account-area account-area__border">
          <div className="account-summary_info">
            <ProfileInfoSummary />
          </div>
          <div className="account_info">
            <GeneralProfileInfo />
            <CreatedProjects />
            <DonatedProjects />

            <Button className="create-project-btn">Create New Project</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountArea;
