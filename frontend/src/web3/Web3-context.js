import React from "react";

const Web3Context = React.createContext({
  web3: undefined,
  connectWallet: async () => {},
});

export default Web3Context;
