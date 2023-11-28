import React, { useState, useContext } from "react";
import { AJAXCall } from "../../auxiliary/FetchingData";
import UserContext from "../../user/User-context";
import Spinning from "../../UI/Spinning";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

function ShowProfileModal({ onClose, msg, userId }) {
  const [characterCount, setCharacterCount] = useState(0);
  const userCtx = useContext(UserContext);

  function handleChange(e) {
    const text = e.target.value;
    setCharacterCount(text.length);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    const jobTitle = e.target[0].value || userCtx.jobTitle;
    const coverLetter = e.target[1].value || userCtx.coverLetter;

    formData.append("jobTitle", jobTitle);
    formData.append("coverLetter", coverLetter);

    const responseData = await userCtx.sendData(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/myAccount/JobInfo/${userId}`,
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
    <Modal onClose={onClose} msg={msg}>
      <div className="personal-info-form-area">
        <form onSubmit={submitHandler}>
          <div className="name-info-area">
            <div className="profil-set-area">
              <label for="name">Your Title</label>
              <input
                type="text"
                id="name"
                placeholder={userCtx.jobTitle || "Enter your full name"}
              />
            </div>
            <div className="profil-set-area">
              <label for="letter">Cover Letter</label>
              <textarea
                type="text"
                id="letter"
                rows="10"
                cols="55"
                maxlength="1000"
                placeholder={userCtx.coverLetter || "Max 1000 character"}
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
              {userCtx.dataisLoading ? <Spinning isBtn={true} /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ShowProfileModal;
