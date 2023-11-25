import React, { useState, useContext } from "react";
import Web3Context from "../../web3/Web3-context";
import CopyIcon from "../../UI/CopyIcon";
import walletAddressFormat from "../../auxiliary/walletAddressFormat";
import Button from "../../UI/Button";

function RequestTable({ currentRequst, projectId, publicView }) {
  const web3Ctx = useContext(Web3Context);
  const [Request, setRequest] = useState(undefined);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

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

  const finalizeProject = async () => {
    console.log("finalize");
  };

  const approveProject = async () => {
    console.log("approve project");
  };

  const requestAction = () => {
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 4000);
    if (!publicView) {
      finalizeProject();
    } else {
      approveProject();
    }
  };

  return (
    <React.Fragment>
      <div className="request-table-area">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Request Title</th>
              <th scope="col">Request Amount</th>
              <th scope="col">Buyer</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
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
                    <td>
                      <Button onClick={requestAction} className="in-table-btn">
                        {publicView ? "Approve" : "Finalize"}
                      </Button>
                    </td>
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
      </div>
      {showMsg && (
        <div className="table-err-msgss">
          <p>{msg}</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default RequestTable;
