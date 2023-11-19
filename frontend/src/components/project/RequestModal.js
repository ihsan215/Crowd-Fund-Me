import React, { useContext, useRef, useState } from "react";
import Modal from "../../UI/Modal";
import Web3Context from "../../web3/Web3-context";
import Spinning from "../../UI/Spinning";

function RequestModal({ onClose, msg, projectID }) {
  const web3Ctx = useContext(Web3Context);
  const formRef = useRef(undefined);
  const [showMsg, setShowMsg] = useState(false);

  const submitRequestToChain = async () => {
    const title = formRef.current[0].value;
    const desc = formRef.current[1].value;
    const buyerAddr = formRef.current[2].value;
    const amount = Number(formRef.current[3].value);
    setShowMsg(true);
    const amountInWei = web3Ctx.web3Instance.utils.toWei(amount, "ether");

    web3Ctx.create_request.createRequestWrite({
      args: [projectID, desc, title, buyerAddr, Number(amountInWei)],
      from: web3Ctx.address,
    });

    setTimeout(() => {
      setShowMsg(false);
      window.location.reload(true);
    }, 10000);
  };

  const submitRequest = (e) => {
    e.preventDefault();
    submitRequestToChain();
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        {showMsg && (
          <h3 className={`${web3Ctx.create_request.createRequestStatus}-bg-n`}>
            {web3Ctx.create_request.createRequestStatus}
          </h3>
        )}

        <h1>Create Project</h1>
        <form ref={formRef} onSubmit={submitRequest}>
          <div class="mb-3 request-form-item">
            <label for="title" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div class="mb-3 request-form-item">
            <label for="desc" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="desx"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div class="mb-3 request-form-item">
            <label for="addr" class="form-label">
              Buyer Address
            </label>
            <input
              type="text"
              class="form-control"
              id="addr"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div class="mb-3 request-form-item">
            <label for="value" class="form-label">
              Request Amount Value in ETH
            </label>
            <input
              type="number"
              class="form-control"
              id="value"
              aria-describedby="emailHelp"
              step="0.001"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark request-submit-btn">
            {web3Ctx.create_request.createRequestStatus == "loading" ? (
              <Spinning isBtn={true} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default RequestModal;
