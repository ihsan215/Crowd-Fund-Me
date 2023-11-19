import React from "react";

const Web3Context = React.createContext({
  web3Instance: undefined,
  isConnected: false,
  address: undefined,
  balance: undefined,

  contractInstance: undefined,

  create_project: {},
  create_request: {},

  walletConnect: () => {},
  disconnectWallet: () => {},
});

export default Web3Context;
