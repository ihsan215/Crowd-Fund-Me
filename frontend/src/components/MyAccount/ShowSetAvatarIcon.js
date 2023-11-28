import React, { useState, useContext } from "react";
import Modal from "../../UI/Modal";
import { AJAXCall } from "../../auxiliary/FetchingData";
import UserContext from "../../user/User-context";
import "../../style/components/MyAccount/ShowSetAvatarIcon.css";
import Button from "../../UI/Button";
import Spinning from "../../UI/Spinning";

function ShowSetAvatarIcon({ onClose, msg, userId }) {
  const userCtx = useContext(UserContext);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    const name = e.target[0].value || userCtx.name;
    const email = e.target[1].value || userCtx.email;
    const country = e.target[2].value || userCtx.country;
    const city = e.target[3].value || userCtx.city;
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("profileImg", e.target[4].files[0]);

    const responseData = await userCtx.sendData(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/myAccount/${userId}`,
      formData
    );
    if (responseData.message === "ok") {
      onClose();
      window.location.reload();
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
                  placeholder={userCtx.name || "Enter your full name"}
                />
              </div>
              <div className="profil-set-area">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder={userCtx.email || "Enter your e-mail"}
                />
              </div>
              <div className="location_area">
                <div className="profil-set-area">
                  <label for="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder={userCtx.country || "Enter your country"}
                  />
                </div>
                <div className="profil-set-area">
                  <label for="City">City</label>
                  <input
                    type="text"
                    id="City"
                    placeholder={userCtx.city || "Enter your City"}
                  />
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
                {userCtx.dataisLoading ? <Spinning isBtn={true} /> : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default ShowSetAvatarIcon;
