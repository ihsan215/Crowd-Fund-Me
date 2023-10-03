import React from "react";
import Web3Context from "./Web3-context.js";
import Web3 from "web3";

const Web3Provider = (props) => {
  // Assign all data
  const web3Context = {
    web3: null,
    connectWallet: null,
  };
  web3Context.connectWallet = function connectWallet() {
    // connect request
    window.ethereum.request({ method: "eth_requestAccounts" });

    // create web3 instance with user provider
    web3Context.web3 = new Web3(window.ethereum);
  };

  return (
    <React.Fragment>
      <Web3Context.Provider value={web3Context}>
        {props.children}
      </Web3Context.Provider>
    </React.Fragment>
  );
};

export default Web3Provider;
