import React from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";

const Web3Provider = (props) => {
  const { open, close } = useWeb3Modal();

  const walletConnect = () => {
    open();
  };

  const web3Context = {
    walletConnect,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
