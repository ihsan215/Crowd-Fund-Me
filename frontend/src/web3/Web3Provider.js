import React, { useState } from "react";
import Web3Context from "./Web3-context.js";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [web3, setWeb3] = useState(undefined);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);

  async function connectAccount() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        checkAccountConnected();
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Please install a wallet extansion !");
    }
  }

  async function checkAccountConnected() {
    try {
      const web3 = new Web3(window.ethereum);
      const acc = await web3.eth.getAccounts();

      if (acc.length > 0) {
        setWalletIsConnected(true);
        setAccounts(acc);
        setWeb3Instance(web3);
      } else {
        setWalletIsConnected(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const setWeb3Instance = (web3) => {
    try {
      setWeb3(web3);
      window.ethereum.on("accountsChanged", function () {
        checkAccountConnected();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const web3Context = {
    web3,
    walletIsConnected,
    accounts,
    mainAccount: accounts[0],

    connectAccount,
    checkAccountConnected,
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
