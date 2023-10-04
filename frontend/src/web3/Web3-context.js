import React from "react";

const Web3Context = React.createContext({
  // variables
  isWalletConnected: false,
  web3: undefined,
  WalletAccounts: [],

  // functions
  setWalletAccounts: () => {},
  setIsWalletConnected: () => {},
  setWeb3Instance: () => {},

  connectAccount: async () => {},
  checkAccountConnected: async () => {},
  setDefault: () => {},
});

export default Web3Context;
