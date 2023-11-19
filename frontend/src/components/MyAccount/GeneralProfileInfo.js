import React, { useState, useContext } from "react";

import EditBtn from "../../UI/EditBtn";
import UserContext from "../../user/User-context";
import ShowProfileModal from "./ShowProfileModal";
import Spinning from "../../UI/Spinning";

import "../../style/components/MyAccount/GeneralProfileInfo.css";

function GeneralProfileInfo({ userId, publicView }) {
  const [profileAreaShowModal, setProfileAreaShowModal] = useState(false);
  const userCtx = useContext(UserContext);

  const closeProfileAreaShowModal = () => {
    setProfileAreaShowModal(false);
  };

  return (
    <React.Fragment>
      {userCtx.dataisLoading ? (
        <Spinning />
      ) : (
        <div className="general-profile-area-detailed">
          <div className="edit-and-title-area">
            <h3>{userCtx.jobTitle || "No Title"}</h3>
            {!publicView && (
              <EditBtn
                setEditStatus={setProfileAreaShowModal}
                className={"profile__icon"}
              />
            )}
          </div>

          <p>{userCtx.coverLetter || "Plase set your Info"}</p>
        </div>
      )}

      {profileAreaShowModal && (
        <ShowProfileModal
          onClose={closeProfileAreaShowModal}
          msg={"Set Profile Info"}
          userId={userId}
        />
      )}
    </React.Fragment>
  );
}

export default GeneralProfileInfo;
