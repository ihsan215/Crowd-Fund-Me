import React, { useState } from "react";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

function ShowProfileModal({ onClose, msg }) {
  const [characterCount, setCharacterCount] = useState(0);

  function handleChange(e) {
    const text = e.target.value;
    setCharacterCount(text.length);
  }

  return (
    <Modal onClose={onClose} msg={msg}>
      <div className="personal-info-form-area">
        <form>
          <div className="name-info-area">
            <div className="profil-set-area">
              <label for="name">Your Title</label>
              <input type="text" id="name" placeholder="Enter your full name" />
            </div>
            <div className="profil-set-area">
              <label for="letter">Cover Letter</label>
              <textarea
                type="text"
                id="letter"
                rows="10"
                cols="55"
                maxlength="1000"
                placeholder="Max 1000 character"
                onChange={handleChange}
              />
            </div>
            <div id="the-count">
              <span id="current">{characterCount}</span>
              <span id="maximum">/ 1000</span>
            </div>
          </div>

          <div className="submit-area">
            <Button type="submit" className="personel-info-sbmt-btn">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ShowProfileModal;
