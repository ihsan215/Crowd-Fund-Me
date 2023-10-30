import React, { useState } from "react";

import EditBtn from "../../UI/EditBtn";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

import "../../style/components/MyAccount/AccountGeneralProfile.css";

import emptyAvatarSrc from "../../style/img/empty_avatar.png";
import locationIcon from "../../style/img/location.png";

function AccountGeneralProfile() {
  const [avatarIconshowModal, setAvatarIconshowModal] = useState(false);

  function ShowSetAvatarIcon({ onClose, msg }) {
    return (
      <React.Fragment>
        <Modal onClose={onClose} msg={msg}></Modal>
      </React.Fragment>
    );
  }

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
        </div>
      </div>
      <Button>See Public View</Button>
      {avatarIconshowModal && (
        <ShowSetAvatarIcon onClose={closeAvatarIconModel} msg={"DENEME"} />
      )}
    </React.Fragment>
  );
}

export default AccountGeneralProfile;
