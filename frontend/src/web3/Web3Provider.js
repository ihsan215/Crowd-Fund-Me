import React, { useState, useEffect, useCallback } from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ContractInfo } from "../contract/ContractInfo.js";
import { useContractWrite } from "wagmi";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [web3Instance, setweb3Instance] = useState(undefined);
  const [contractInstance, setContractInstance] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isDisconnected } = useAccount();

  // create project
  const {
    data: createPrjectdata,
    status: createPrjectStatus,
    write: createProjectWrite,
  } = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "create_project",
  });

  // create request
  const {
    data: createRequstdata,
    status: createRequestStatus,
    write: createRequestWrite,
  } = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "create_request",
  });

  //support
  const {
    data: supportProjectData,
    status: supportProjectStatus,
    write: supportProjectWrite,
  } = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "support_project",
  });

  //approve request
  const {
    data: approveRequestData,
    status: approveRequestStatus,
    write: approveRequestWrite,
  } = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "approve_request",
  });

  //finalize request
  const {
    data: finalizeRequestData,
    status: finalizeRequestStatus,
    write: finalizeRequestWrite,
  } = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "finalize_request",
  });

  const walletConnect = () => {
    open({ view: "Networks" });
  };

  const disconnectWallet = async () => {
    disconnect();
  };

  const getBalance = useCallback(
    async (web3) => {
      const balanceWei = await web3?.eth.getBalance(address);
      const balanceEth = web3?.utils.fromWei(balanceWei, "ether");
      const balance = Number(balanceEth).toFixed(4);
      setBalance(balance);
    },
    [address]
  );

  async function setWeb3Values() {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    setContractInstance(contractInstance);
    setweb3Instance(web3);
    getBalance(web3);
  }

  useEffect(() => {
    if (!isDisconnected && address) {
      setWeb3Values();
    }
  }, [isDisconnected, address, getBalance]);

  function setMessage(setClass, setMsg) {
    if (createPrjectStatus === "error") {
      setClass("error");
      setMsg("Transaction has been failed !");
    } else if (createPrjectStatus === "success") {
      setClass("confirm");
      setMsg(
        "Transaction request has been sent. Please wait pending status and check transaction your wallet"
      );
    } else if (createPrjectStatus === "loading") {
      setClass("loading");
      setMsg("The process has begun, please wait!");
    }
    setTimeout(() => {
      setClass("");
      setMsg("");
    }, 10000);
  }

  const web3Context = {
    web3Instance,
    isConnected: !isDisconnected,
    address,
    balance,
    contractInstance,

    create_project: {
      createPrjectdata,
      setMessage,
      createPrjectStatus,
      createProjectWrite,
    },

    create_request: {
      createRequstdata,
      createRequestStatus,
      createRequestWrite,
    },

    support_project: {
      supportProjectData,
      supportProjectStatus,
      supportProjectWrite,
    },

    approve_request: {
      approveRequestData,
      approveRequestStatus,
      approveRequestWrite,
    },

    finalize_request: {
      finalizeRequestData,
      finalizeRequestStatus,
      finalizeRequestWrite,
    },

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
