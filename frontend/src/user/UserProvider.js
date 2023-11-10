import React, { useState } from "react";
import UserContext from "./User-context";

import { AJAXCall } from "../auxiliary/FetchingData";

const UserProvider = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [profileImg, setProfileImg] = useState(undefined);

  const fetchGeneralData = async (url) => {
    const userData = await AJAXCall(url, {
      method: "GET",
      mode: "no-cors",
    });
    setName(userData.name);
    setEmail(userData.email);
    setCountry(userData.country);
    setCity(userData.city);
    setProfileImg(userData.profileImg);
    setIsFetched(true);
  };

  const userContext = {
    isFetched,
    name,
    email,
    country,
    city,
    profileImg,

    fetchGeneralData,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
