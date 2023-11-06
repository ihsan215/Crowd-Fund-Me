import React, { useState } from "react";

import EditBtn from "../../UI/EditBtn";

import ShowProfileModal from "./ShowProfileModal";

import "../../style/components/MyAccount/GeneralProfileInfo.css";

function GeneralProfileInfo() {
  const [profileAreaShowModal, setProfileAreaShowModal] = useState(false);

  const closeProfileAreaShowModal = () => {
    setProfileAreaShowModal(false);
  };

  return (
    <React.Fragment>
      <div className="general-profile-area-detailed">
        <div className="edit-and-title-area">
          <h3>Software Engineer</h3>
          <EditBtn
            setEditStatus={setProfileAreaShowModal}
            className={"profile__icon"}
          />
        </div>

        <p>
          Greetings, My name is Ali İhsan Taş, and I am a highly motivated
          Software Engineer with a passion for innovation and technology. I
          graduated from Yildiz Technical University in 2021 with a Bachelor's
          degree in Mechatronics Engineering, where I excelled in various areas
          such as aviation, control theory, UAVs, robotics embedded software,
          and systems modeling. During my undergraduate studies, I had the
          privilege of being a member of the Lagari UAV team, which led to my
          notable accomplishments in two prestigious international UAV
          competitions. Specifically, I emerged victorious and secured the first
          and third prizes in these esteemed events. Furthermore, I graduated
          with distinction, ranking second in my department during my bachelor's
          degree.
        </p>
      </div>
      {profileAreaShowModal && (
        <ShowProfileModal
          onClose={closeProfileAreaShowModal}
          msg={"Set Profile Info"}
        />
      )}
    </React.Fragment>
  );
}

export default GeneralProfileInfo;
