import React, { useState, useEffect, useContext } from "react";

import EditBtn from "../../UI/EditBtn";
import UserContext from "../../user/User-context";
import ShowSetAvatarIcon from "./ShowSetAvatarIcon";
import Spinning from "../../UI/Spinning";

import "../../style/components/MyAccount/AccountGeneralProfile.css";

import emptyAvatarSrc from "../../style/img/empty_avatar.png";

import locationIcon from "../../style/img/location.png";
import mailIcon from "../../style/img/mail.png";

function AccountGeneralProfile({ userId, publicView }) {
  const [avatarIconshowModal, setAvatarIconshowModal] = useState(false);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.fetchGeneralData(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/myAccount/${userId}`
    );
  }, [userId]);

  const closeAvatarIconModel = () => {
    setAvatarIconshowModal(false);
  };

  return (
    <React.Fragment>
      {userCtx.dataisLoading ? (
        <Spinning />
      ) : (
        <div className="profile-area">
          <div className="profile-img-container">
            {!publicView && (
              <EditBtn
                setEditStatus={setAvatarIconshowModal}
                className={"set-avatar-icon"}
              />
            )}

            <img
              src={`${
                userCtx.profileImg
                  ? `data:image/png;base64,${new Buffer.from(
                      userCtx.profileImg
                    ).toString("base64")}`
                  : emptyAvatarSrc
              } `}
              alt="empty avatar"
            />
          </div>
          <div className="user-info-area">
            <h3 className={`${userCtx.email || "ml-name"}`}>
              {userCtx.name ||
                "Hi User#" +
                  Math.floor(Math.random() * 100) +
                  " please set your information"}
            </h3>
            {userCtx.country && (
              <div className="location-area">
                <img src={locationIcon} alt="location icon" />
                <p>
                  {userCtx.city}, {userCtx.country}
                </p>
              </div>
            )}
            {userCtx.email && (
              <div className="location-area">
                <img src={mailIcon} alt="mail icon" />
                <p>
                  <a href={`mailto:${userCtx.email}`}> {userCtx.email}</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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
