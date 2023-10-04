import React from "react";

const Web3Context = React.createContext({
  web3: undefined,
  walletIsConnected: false,
  accounts: [],
  mainAccount: undefined,

  connectAccount: async () => {},
  checkAccountConnected: async () => {},
});

export default Web3Context;
