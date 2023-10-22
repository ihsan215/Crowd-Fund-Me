import React from "react";

import Button from "../../UI/Button";

function Form() {
  return (
    <React.Fragment>
      <h1>Contact Us</h1>
      <form className="contact-form">
        <div className="input__item">
          <label form="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" />
        </div>

        <div className="input__item-contact_info_group">
          <div className="input__item">
            <label form="email">E-mail</label>
            <input type="email" id="email" placeholder="Enter your e-mail" />
          </div>
          <div className="input__item">
            <label form="tel">Phone</label>
            <input type="tel" id="tel" placeholder="Enter your phone" />
          </div>
        </div>
        <div className="input__item">
          <label form="msg">Message</label>
          <textarea
            type="textarea"
            id="msg"
            placeholder="Your message here ..."
          />
        </div>

        <Button type="submit" className="submit__btn">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Form;
