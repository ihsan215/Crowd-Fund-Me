import React, { useState, useEffect } from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [web3Instance, setweb3Instance] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isDisconnected } = useAccount();

  const walletConnect = () => {
    open({ view: "Networks" });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const getBalance = async (web3) => {
    const balanceWei = await web3?.eth.getBalance(address);
    const balanceEth = web3?.utils.fromWei(balanceWei, "ether");
    const balance = Number(balanceEth).toFixed(4);
    setBalance(balance);
    console.log(balance);
  };

  useEffect(() => {
    if (!isDisconnected && address) {
      const web3 = new Web3(window.ethereum);
      setweb3Instance(web3);
      getBalance(web3);
    }
  }, [isDisconnected, address]);

  const web3Context = {
    web3Instance,
    isConnected: !isDisconnected,
    address,
    balance,
    walletConnect,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
