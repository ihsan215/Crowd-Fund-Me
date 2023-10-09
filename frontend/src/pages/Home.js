import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../web3/Injector";

function HomePage() {
  const { activate, deactivate, account } = useWeb3React();
  return (
    <React.Fragment>
      <div>
        Account: {account}
        {account ? (
          <button onClick={() => deactivate()}>Disconnect</button>
        ) : (
          <button onClick={() => activate(injected)}>Connect</button>
        )}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
