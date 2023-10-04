import React, { useState, useCallback } from "react";
import Web3Context from "./Web3-context.js";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [WalletAccounts, setWalletAccounts] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [web3, setWeb3] = useState(undefined);

  const setWeb3Instance = useCallback(
    (web3) => {
      try {
        setWeb3(web3);
        window.ethereum.on("accountsChanged", function () {
          checkAccountConnected();
        });
      } catch (error) {
        throw error;
      }
    },
    [checkAccountConnected]
  );

  const setDefault = useCallback(() => {
    setWalletAccounts([]);
    setIsWalletConnected(false);
    setWeb3(undefined);
  }, []);

  const checkAccountConnected = useCallback(async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const acc = await web3.eth.getAccounts();

      if (acc.length > 0) {
        setIsWalletConnected(true);
        setWalletAccounts(acc);
        setWeb3Instance(web3);
      } else {
        setDefault();
      }
    } catch (error) {
      throw error;
    }
  }, [setDefault, setWeb3Instance]);

  const connectAccount = useCallback(async () => {
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
  }, [checkAccountConnected]);

  // Assign all data
  const web3Context = {
    // variables
    isWalletConnected,
    web3,
    WalletAccounts,

    // functions
    setWalletAccounts,
    setIsWalletConnected,
    setWeb3Instance,
    connectAccount,
    checkAccountConnected,
    setDefault,
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
