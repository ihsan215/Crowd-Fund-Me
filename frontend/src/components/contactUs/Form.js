import React, { useContext, useState } from "react";
import Button from "../../UI/Button";
import UserContext from "../../user/User-context";
import Spining from "../../UI/Spinning";

function Form() {
  const userCtx = useContext(UserContext);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const submitContactUsForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const mail = e.target[1].value;
    const msg = e.target[3].value;
    formData.append("mail", mail);
    formData.append("msg", msg);

    setShowMsg(true);

    setMsg("Sending ...");

    const responseData = await userCtx.sendData(
      "https://crodfundme-server-21625d4d752e.herokuapp.com/ContactUs",
      formData
    );
    console.log(responseData.message);

    if (responseData.message == "sended") {
      setShowMsg(false);
      setShowStatus(true);
      setMsg(responseData.message);
    } else {
      setShowMsg(true);
      setShowStatus(true);
      setMsg("Not Sended");
    }

    setTimeout(() => {
      setShowMsg(false);
      setShowStatus(false);
      setMsg("");
    }, 2000);
  };

  return (
    <React.Fragment>
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={submitContactUsForm}>
        <div className="input__item">
          <label form="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" />
        </div>

        <div className="input__item-contact_info_group">
          <div className="input__item">
            <label form="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your e-mail"
              required
            />
          </div>
          <div className="input__item">
            <label form="tel">Phone</label>
            <input
              type="tel"
              id="tel"
              placeholder="Enter your phone"
              required
            />
          </div>
        </div>
        <div className="input__item">
          <label form="msg">Message</label>
          <textarea
            type="textarea"
            id="msg"
            placeholder="Your message here ..."
            required
          />
        </div>

        <Button type="submit" className="submit__btn">
          {showMsg ? (
            <Spining isBtn={true} />
          ) : showStatus ? (
            "Sended"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Form;
