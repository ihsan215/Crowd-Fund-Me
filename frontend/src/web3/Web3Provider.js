import React, { useState, useEffect } from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Injector";

const Web3Provider = (props) => {
  const [web3Instance, setWeb3Instance] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const web3React = useWeb3React();

  const connectWallet = async () => {
    await web3React.activate(injected);
  };

  const disconnectWallet = () => {
    web3React.deactivate();
  };

  const _getBalance = async () => {
    const balanceWei = await web3React.library.eth.getBalance(
      web3React.account
    );
    const balanceTether = await web3React.library.utils.fromWei(
      balanceWei,
      "ether"
    );
    setBalance(balanceTether);
  };

  useEffect(() => {
    if (web3React.active) {
      setWeb3Instance(web3React.library);
      _getBalance();
    }
  }, [web3React.active]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.ethereum._state.accounts?.length > 0) {
        connectWallet();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const web3Context = {
    account: web3React.account,
    isWalletConnected: web3React.active,
    balance,
    web3Instance,
    connectWallet,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
