import React, { useReducer } from "react";
import UserContext from "./User-context";

import { AJAXCall } from "../auxiliary/FetchingData";

import { defaultUserParameters, userReducer } from "./UserReducer";

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(userReducer, defaultUserParameters);

  const fetchGeneralData = async (url, cb) => {
    dispatch({ type: "SET_DEFAULT" });
    const userData = await AJAXCall(url, {
      method: "GET",
      mode: "no-cors",
    });

    if (userData.message === "ok") {
      dispatch({ type: "FETCH_GENERAL_DATA", data: userData });
    }

    cb(false);
  };

  const userContext = {
    name: userState.name,
    email: userState.email,
    country: userState.country,
    city: userState.city,
    profileImg: userState.profileImg?.data?.data,

    fetchGeneralData,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
