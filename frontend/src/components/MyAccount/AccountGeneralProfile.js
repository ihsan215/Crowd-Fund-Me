import React, { useState } from "react";

import EditBtn from "../../UI/EditBtn";

import Button from "../../UI/Button";
import ShowSetAvatarIcon from "./ShowSetAvatarIcon";

import "../../style/components/MyAccount/AccountGeneralProfile.css";

import emptyAvatarSrc from "../../style/img/empty_avatar.png";
// import ihsansrc from "../../style/img/ihsan.JPG";
import locationIcon from "../../style/img/location.png";
import mailIcon from "../../style/img/mail.png";

function AccountGeneralProfile() {
  const [avatarIconshowModal, setAvatarIconshowModal] = useState(false);

  const closeAvatarIconModel = () => {
    setAvatarIconshowModal(false);
  };

  return (
    <React.Fragment>
      <div className="profile-area">
        <div className="profile-img-container">
          <EditBtn
            setEditStatus={setAvatarIconshowModal}
            className={"set-avatar-icon"}
          />
          <img src={emptyAvatarSrc} alt="empty avatar" />
        </div>
        <div className="user-info-area">
          <h3>Ali İhsan Taş</h3>
          <div className="location-area">
            <img src={locationIcon} alt="location icon" />
            <p>Istanbul, Turkey</p>
          </div>
          <div className="location-area">
            <img src={mailIcon} alt="mail icon" />
            <p>aliihsantas34@gmail.com</p>
          </div>
        </div>
      </div>

      {avatarIconshowModal && (
        <ShowSetAvatarIcon
          onClose={closeAvatarIconModel}
          msg={"Set Personal Info"}
        />
      )}
    </React.Fragment>
  );
}

export default AccountGeneralProfile;
