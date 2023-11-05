import React from "react";
import Modal from "../../UI/Modal";

import "../../style/components/MyAccount/ShowSetAvatarIcon.css";
import Button from "../../UI/Button";

function ShowSetAvatarIcon({ onClose, msg }) {
  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <div className="personal-info-form-area">
          <form>
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
