import React, { useState, useContext } from "react";
import UserContext from "../../user/User-context";
import Web3Context from "../../web3/Web3-context";
import { getProjectFromID } from "./ProjectManage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CopyIcon from "../../UI/CopyIcon";
import walletAddressFormat from "../../auxiliary/walletAddressFormat";
import Web3 from "web3";
import RequestTable from "./RequestTable";
import Button from "../../UI/Button";
import RequestModal from "./RequestModal";
import SupoortProjectModal from "./SupportProjectModal";

function ProjectInfoArea({ project, projectId }) {
  const [dataOnServer, setDataOnServer] = useState({});
  const [publicView, setPublicView] = useState(false);
  const userCtx = useContext(UserContext);
  const web3Ctx = useContext(Web3Context);
  const [minContEth, setMinContEth] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const { userId } = useParams();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportValue, setSupportValue] = useState(0);
  const [showMsgErr, setshowMsgErr] = useState(false);

  const getProjectInfo = async () => {
    const web3 = new Web3(window.ethereum);
    const dataOnServer = await getProjectFromID(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/getProject/${projectId}`
    );
    setDataOnServer(dataOnServer);
    const minContEth = web3.utils.fromWei(
      project.minimum_contribution,
      "ether"
    );
    const currentAmount = web3.utils.fromWei(project.current_amount, "ether");

    const requiredAmount = web3.utils.fromWei(
      project.total_required_amount,
      "ether"
    );

    setMinContEth(minContEth);
    setCurrentAmount(currentAmount);
    setRequiredAmount(requiredAmount);
  };

  const clickCopyBoard = () => {
    navigator.clipboard.writeText(dataOnServer?.hash);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useState(() => {
    getProjectInfo();
    userCtx.fetchGeneralData(`/myAccount/${project.project_owner}`);
    console.log(project.project_owner, userId);
    if (web3Ctx.address == project.project_owner) {
      setPublicView(false);
    } else {
      setPublicView(true);
    }
  }, []);

  const closeModel = () => {
    setshowModal(false);
    setShowSupportModal(false);
  };

  const createProjectHandle = () => {
    setshowModal(true);
  };

  const supportProjectHandle = (e) => {
    e.preventDefault();

    if (minContEth > Number(e.target[0].value)) {
      setshowMsgErr(true);
      setTimeout(() => {
        setshowMsgErr(false);
      }, 3000);
    } else {
      setSupportValue(Number(e.target[0].value));
      setShowSupportModal(true);
    }
  };

  return (
    <React.Fragment>
      <div className="project-info-area">
        <div className="project-info-area__item title-area">
          <h1>{project.title}</h1>
          <img src={dataOnServer?.mainPageImg} />
          <Link to={`/myAccount/${project.project_owner}`}>
            by {userCtx.name}
          </Link>
          <div className="transaction-area">
            <p style={{ fontWeight: "500" }}>Transaction Hash : </p>
            <p>
              {walletAddressFormat(dataOnServer?.hash)}
              <CopyIcon
                onClick={clickCopyBoard}
                isCopied={isCopied}
                className="copy-icon-area-wh"
                modalClass="modalClass"
              />
            </p>
          </div>
          <div className="transaction-area" style={{ margin: "0px" }}>
            <p style={{ fontWeight: "500" }}>Categoria : </p>
            <p>{dataOnServer?.categoria}</p>
          </div>
        </div>

        <div className="project-info-area__item info-area budget">
          <div className="budget-item">
            <h5>Total Sponsor</h5>
            <p>{Number(project.sponsors_count)} </p>
          </div>
          <div className="budget-item">
            <h5>Project ID</h5>
            <p># {projectId}</p>
          </div>
          <div className="budget-item">
            <h5>Project Status</h5>
            <p>{project.is_complete ? "Completed" : "Ongoing"}</p>
          </div>
        </div>

        <div className="project-info-area__item info-area">
          <h5>Project Summary</h5>
          <p>{dataOnServer?.projectSummary}</p>
        </div>
        <div className="project-info-area__item info-area">
          <h5>Project Material</h5>
          <p>
            Please{" "}
            <a
              className="external-link"
              href={dataOnServer?.projectMaterial}
              target="_blank"
            >
              click
            </a>{" "}
            for Project Details.
          </p>
        </div>
        <div className="project-info-area__item info-area budget">
          <div className="budget-item">
            <h5>Required Amount</h5>
            <p>{Number(requiredAmount)} ETH</p>
          </div>
          <div className="budget-item">
            <h5>Minimum Contribution</h5>
            <p>{minContEth} ETH</p>
          </div>
          <div className="budget-item">
            <h5>Current Amount</h5>
            <p>{Number(currentAmount)} ETH</p>
          </div>
        </div>

        <div className="project-info-area__item info-area">
          <h5>Project Request</h5>
          <RequestTable
            currentRequst={Number(project.request_count)}
            projectId={projectId}
            publicView={publicView}
          />
        </div>

        <div className="project-info-area__item info-area__btn-area">
          {!publicView ? (
            <div className="project-info-area__item info-area__btn-area">
              <Button onClick={createProjectHandle}>
                Create Project Request
              </Button>
            </div>
          ) : (
            <form
              onSubmit={supportProjectHandle}
              className="project-info-area__item info-area__btn-area btn-area-support-form"
            >
              <div className="form-item">
                <label>Support Amount ETH</label>
                <input
                  className="SuportAmounInput"
                  type="number"
                  required
                  step="0.00001"
                  name="AmountInput"
                  min="0"
                />
              </div>
              <Button className="SupportBtn" type="submit">
                Support Project
              </Button>
              {showMsgErr && (
                <p style={{ color: "#ff0033" }}>
                  You can not donate below the specified minimum contribution
                  amount. You can not donate below the specified minimum
                  contribution amount.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {showModal && (
        <RequestModal
          onClose={closeModel}
          projectID={projectId}
          setshowModal={setshowModal}
        />
      )}
      {showSupportModal && (
        <SupoortProjectModal
          onClose={closeModel}
          value={supportValue}
          projectId={projectId}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectInfoArea;
