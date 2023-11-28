import React, { useReducer, useState } from "react";
import UserContext from "./User-context";

import { AJAXCall } from "../auxiliary/FetchingData";

import { defaultUserParameters, userReducer } from "./UserReducer";

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(userReducer, defaultUserParameters);
  const [dataisLoading, setDataIsLoading] = useState(false);

  const fetchGeneralData = async (url, cb) => {
    setDataIsLoading(true);
    dispatch({ type: "SET_DEFAULT" });
    const userData = await AJAXCall(url, {
      method: "GET",
    });

    if (userData.message === "ok") {
      dispatch({ type: "FETCH_GENERAL_DATA", data: userData });
    }

    setDataIsLoading(false);
  };

  const sendData = async (url, formData) => {
    setDataIsLoading(true);
    const responseData = await AJAXCall(url, {
      method: "POST",

      body: formData,
    });
    setDataIsLoading(false);
    return responseData;
  };

  const userContext = {
    dataisLoading: dataisLoading,
    name: userState.name,
    email: userState.email,
    country: userState.country,
    city: userState.city,
    profileImg: userState.profileImg?.data?.data,
    jobTitle: userState.jobTitle,
    coverLetter: userState.coverLetter,

    fetchGeneralData,
    sendData,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
