import React, { useState, useEffect, useContext } from "react";

import EditBtn from "../../UI/EditBtn";
import UserContext from "../../user/User-context";
import ShowSetAvatarIcon from "./ShowSetAvatarIcon";

import "../../style/components/MyAccount/AccountGeneralProfile.css";

import emptyAvatarSrc from "../../style/img/empty_avatar.png";

import locationIcon from "../../style/img/location.png";
import mailIcon from "../../style/img/mail.png";

function AccountGeneralProfile({ userId }) {
  const [avatarIconshowModal, setAvatarIconshowModal] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.fetchGeneralData(`/myAccount/${userId}`);
  }, []);

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

          <img
            src={`${
              userCtx.isFetched
                ? `data:image/png;base64,${new Buffer.from(
                    userCtx.profileImg?.data?.data
                  ).toString("base64")}`
                : emptyAvatarSrc
            } `}
            alt="empty avatar"
          />
        </div>
        <div className="user-info-area">
          <h3>{userCtx.name}</h3>
          <div className="location-area">
            <img src={locationIcon} alt="location icon" />
            <p>
              {userCtx.city}, {userCtx.country}
            </p>
          </div>
          <div className="location-area">
            <img src={mailIcon} alt="mail icon" />
            <p>{userCtx.email}</p>
          </div>
        </div>
      </div>

      {avatarIconshowModal && (
        <ShowSetAvatarIcon
          onClose={closeAvatarIconModel}
          msg={"Set Personal Info"}
          userId={userId}
        />
      )}
    </React.Fragment>
  );
}

export default AccountGeneralProfile;
