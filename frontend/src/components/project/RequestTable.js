import React, { useState, useContext } from "react";
import Web3Context from "../../web3/Web3-context";
import CopyIcon from "../../UI/CopyIcon";
import walletAddressFormat from "../../auxiliary/walletAddressFormat";
import Button from "../../UI/Button";
import Spinning from "../../UI/Spinning";

function RequestTable({ currentRequst, projectId, publicView }) {
  const web3Ctx = useContext(Web3Context);
  const [Request, setRequest] = useState(undefined);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  const getRequestonChain = async () => {
    const Requests = [];

    for (let i = 0; i <= currentRequst - 1; i++) {
      const reqestInfo = await web3Ctx.contractInstance.methods
        .returnRequest(projectId, i)
        .call({
          from: web3Ctx.address,
        });
      const check_is_approved = await web3Ctx.contractInstance.methods
        .return_is_request_approve(projectId, i)
        .call({
          from: web3Ctx.address,
        });

      reqestInfo.id = i;
      reqestInfo.check_is_approved = check_is_approved;

      Requests.push(reqestInfo);
    }

    setRequest(Requests);
  };

  useState(() => {
    getRequestonChain();
  }, []);

  const clickCopyBoard = (adr) => {
    navigator.clipboard.writeText(adr);
  };

  const finalizeProject = async (requestId) => {
    console.log("finalize");
    const status = await web3Ctx.finalize_request.finalizeRequestWrite({
      args: [projectId, requestId],
      from: web3Ctx.address,
    });

    if (web3Ctx.finalize_request.finalizeRequestStatus == "error") {
      setMsg(
        "Please check your project balance and wait the voting, then try again"
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 5000);
    }
  };

  const approveProject = async (requestId) => {
    const check_is_approved = await web3Ctx.contractInstance.methods
      .return_is_request_approve(projectId, requestId)
      .call({
        from: web3Ctx.address,
      });
    const check_is_sponsor = await web3Ctx.contractInstance.methods
      .supponsor_check(web3Ctx.address, projectId)
      .call({
        from: web3Ctx.address,
      });

    if (!check_is_sponsor) {
      setMsg(`Only sponsors can vote. Error for : ${requestId}`);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
      return;
    }

    if (check_is_approved) {
      setMsg(
        `Only vote once for an request. Error for: Request - ${requestId}`
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
      return;
    }

    try {
      await web3Ctx.approve_request.approveRequestWrite({
        args: [projectId, requestId],
        from: web3Ctx.address,
      });
    } catch (e) {
      throw e;
    }
  };

  const requestAction = (e) => {
    const requestId = Number(e.target.getAttribute("data-requestId"));
    if (!publicView) {
      finalizeProject(requestId);
    } else {
      approveProject(requestId);
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
              <th scope="col">Approved Votes</th>
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
                    <td>{Number(item[5])}</td>
                    <td>
                      <Button
                        onClick={requestAction}
                        className="in-table-btn"
                        requestId={item.id}
                      >
                        {publicView ? (
                          item.check_is_approved ? (
                            "Approved"
                          ) : web3Ctx.approve_request.approveRequestStatus ==
                            "loading" ? (
                            <Spinning isBtn={true} />
                          ) : (
                            "Approve"
                          )
                        ) : (
                          "Finalize"
                        )}
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
      {showMsg > 0 && (
        <div className="table-err-msgss" style={{ marginTop: "1rem" }}>
          <p>{msg}</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default RequestTable;
