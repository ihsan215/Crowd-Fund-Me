import React from "react";

import Form from "./Form";
import Map from "./Map";

import "../../style/components/contactUs/contactUs.css";

function ContactForm() {
  return (
    <React.Fragment>
      <div className="container__area">
        <div className="form-col">
          <Form />
        </div>
        <div className="map-col">
          <Map />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ContactForm;
