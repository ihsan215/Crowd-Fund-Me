import React, { useContext, useState } from "react";
import UserContext from "../../user/User-context";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/components/MyAccount/AccountArea.css";
import AccountGeneralProfile from "./AccountGeneralProfile";
import ProfileInfoSummary from "./ProfileInfoSummary";
import GeneralProfileInfo from "./GeneralProfileInfo";
import CreatedProjects from "./CreatedProjects";
import DonatedProjects from "./DonatedProjects";

import Button from "../../UI/Button";

function AccountArea() {
  const params = useParams();
  const [showMsg, setShowMessage] = useState(false);
  const userCtx = useContext(UserContext);
  const { userId } = params;
  const navigate = useNavigate();

  const clickCreateProject = () => {
    if (userCtx.name) {
      navigate(`/${userId}/createProject`);
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

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
            <GeneralProfileInfo userId={userId} />
            <CreatedProjects />
            <DonatedProjects />
            <Button className="create-project-btn" onClick={clickCreateProject}>
              Create New Project
            </Button>
            {showMsg && (
              <h5 style={{ color: "red" }}>
                Please set your name or nickname before create project
              </h5>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountArea;
