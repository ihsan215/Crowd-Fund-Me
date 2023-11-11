import React from "react";

const UserContext = React.createContext({
  name: undefined,
  email: undefined,
  country: undefined,
  city: undefined,
  profileImg: undefined,

  fetchGeneralData: () => {},
});

export default UserContext;
