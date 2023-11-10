import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal";

import "../../style/components/MyAccount/ShowSetAvatarIcon.css";
import { AJAXCall } from "../../auxiliary/FetchingData";
import Button from "../../UI/Button";

function ShowSetAvatarIcon({ onClose, msg, userId }) {
  const getUserData = async () => {
    const responseData = await AJAXCall(`/myAccount/${userId}`, {
      method: "GET",
      mode: "no-cors",
    });
    console.log(responseData);
  };

  useEffect(() => {
    console.log("Fetching..");
    getUserData();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target[0].value);
    formData.append("email", e.target[1].value);
    formData.append("country", e.target[2].value);
    formData.append("city", e.target[3].value);
    formData.append("profileImg", e.target[4].files[0]);

    const responseData = await AJAXCall(`/myAccount/${userId}`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    if (responseData.message === "ok") {
      onClose();
    } else {
      throw new Error("An error occuring fetching data !");
    }
  }

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <div className="personal-info-form-area">
          <form onSubmit={submitHandler}>
            <div className="name-info-area">
              <div className="profil-set-area">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="profil-set-area">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your e-mail"
                />
              </div>
              <div className="location_area">
                <div className="profil-set-area">
                  <label for="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter your country"
                  />
                </div>
                <div className="profil-set-area">
                  <label for="City">City</label>
                  <input type="text" id="City" placeholder="Enter your City" />
                </div>
              </div>
            </div>
            <div className="profile-img-area">
              <label for="photo">Upload Your Photo</label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                placeholder="Upload File"
              />
            </div>
            <div className="submit-area">
              <Button type="submit" className="personel-info-sbmt-btn">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default ShowSetAvatarIcon;
