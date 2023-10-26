import React from "react";

const Web3Context = React.createContext({
  walletConnect: async () => {},
});

export default Web3Context;
