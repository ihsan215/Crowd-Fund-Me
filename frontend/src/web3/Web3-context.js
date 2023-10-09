import React from "react";

const Web3Context = React.createContext({
  account: undefined,
  isWalletConnected: false,
  balance: undefined,
  web3Instance: undefined,

  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export default Web3Context;
