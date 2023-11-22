import React, { useState, useContext } from "react";
import Web3Context from "../../web3/Web3-context";
import CopyIcon from "../../UI/CopyIcon";
import walletAddressFormat from "../../auxiliary/walletAddressFormat";

function RequestTable({ currentRequst, projectId }) {
  const web3Ctx = useContext(Web3Context);
  const [Request, setRequest] = useState(undefined);

  const getRequestonChain = async () => {
    console.log(currentRequst);

    const Requests = [];

    for (let i = 0; i <= currentRequst - 1; i++) {
      const reqestInfo = await web3Ctx.contractInstance.methods
        .returnRequest(projectId, i)
        .call({
          from: web3Ctx.address,
        });

      reqestInfo.id = i;

      Requests.push(reqestInfo);
    }

    setRequest(Requests);
    console.log(Requests);
  };

  useState(() => {
    getRequestonChain();
  }, []);

  const clickCopyBoard = (adr) => {
    navigator.clipboard.writeText(adr);
  };

  return (
    <React.Fragment>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Request Title</th>
            <th scope="col">Request Amount</th>
            <th scope="col">Buyer</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {Request?.length > 0 ? (
            Request.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item[0]}</td>
                  <td>
                    {Number(
                      web3Ctx.web3Instance.utils.fromWei(item[3], "ether")
                    )}{" "}
                    ETH
                  </td>
                  <td>
                    {walletAddressFormat(item[2])}{" "}
                    <CopyIcon
                      onClick={clickCopyBoard.bind(this, item[2])}
                      className="copy-icon-area-wh"
                    />
                  </td>
                  <td>{item[4] ? "completed" : "ongoing"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <th scope="row">No Created Request</th>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default RequestTable;
