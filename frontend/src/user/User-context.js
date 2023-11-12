import React from "react";

const UserContext = React.createContext({
  dataisLoading: false,

  name: undefined,
  email: undefined,
  country: undefined,
  city: undefined,
  profileImg: undefined,

  jobTitle: undefined,
  coverLetter: undefined,

  fetchGeneralData: async () => {},
  sendData: async () => {},
});

export default UserContext;
