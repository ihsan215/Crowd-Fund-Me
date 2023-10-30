import React, { useState } from "react";

import EditBtn from "../../UI/EditBtn";

import Modal from "../../UI/Modal";

import "../../style/components/MyAccount/AccountGeneralProfile.css";

function AccountGeneralProfile() {
  const [showModal, setshowModal] = useState(false);

  function ShowSetGeneralProfileModal({ onClose, msg }) {
    return (
      <React.Fragment>
        <Modal onClose={onClose} msg={msg}></Modal>
      </React.Fragment>
    );
  }

  const closeModel = () => {
    setshowModal(false);
  };

  return (
    <React.Fragment>
      <div className="profile-area">
        <div className="profile-img-container">
          <img
            src={
              " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
            }
            alt=""
          />
        </div>
        <div className="user-info-area">
          <p>Name</p>
          <p>Location</p>
        </div>
      </div>

      <EditBtn setEditStatus={setshowModal} />
      <p>General Profile</p>
      {showModal && (
        <ShowSetGeneralProfileModal onClose={closeModel} msg={"DENEME"} />
      )}
    </React.Fragment>
  );
}

export default AccountGeneralProfile;
