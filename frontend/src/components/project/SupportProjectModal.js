import React, { useContext, useState } from "react";
import Web3Context from "../../web3/Web3-context";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Spinning from "../../UI/Spinning";

function SupoortProjectModal({ onClose, msg, value, projectId }) {
  const web3Ctx = useContext(Web3Context);
  const [showMsg, setShowMsg] = useState(false);

  const supportProject = async () => {
    setShowMsg(true);
    const valueInWei = web3Ctx.web3Instance.utils.toWei(value, "ether");
    web3Ctx.support_project.supportProjectWrite({
      args: [projectId],
      from: web3Ctx.address,
      value: valueInWei,
    });
  };

  const MessageArea = (statusObj) => {
    const status = statusObj.status;
    const MSG = {};
    if (status === "error") {
      MSG.msg = "An error has occurred, please. Please try again";
      MSG.className = "error-msg-modal";
      setTimeout(() => {
        setShowMsg(false);
      }, 5000);
    } else if (status === "success") {
      MSG.msg = "The transaction request has been fulfilled.";
      MSG.className = "success-msg-modal";
      setTimeout(() => {
        setShowMsg(false);
        onClose();
      }, 5000);
    } else if (status === "loading") {
      MSG.msg = "Waiting ...";
      MSG.className = "waiting-msg-modal";
      MSG.spining = <Spinning isBtn={true} />;
    }

    return (
      <React.Fragment>
        <h3 className={MSG.className}>{MSG.msg}</h3>
        {MSG.spining}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <div className="support-modal-area">
          <h1>Support Project</h1>
          <p>
            You will donate {value} ETH to support the project. Do you approve
            of this?
          </p>
          <div className="support-btn-area">
            <Button className="yes-btn" onClick={supportProject}>
              Yes
            </Button>
            <Button className="no-btn" onClick={onClose}>
              No
            </Button>
          </div>
          {showMsg && (
            <MessageArea
              status={web3Ctx.support_project.supportProjectStatus}
            />
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default SupoortProjectModal;
