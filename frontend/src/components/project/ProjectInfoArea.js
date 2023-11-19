import React, { useState, useContext } from "react";
import UserContext from "../../user/User-context";
import { getProjectFromID } from "./ProjectManage";
import { Link } from "react-router-dom";
import CopyIcon from "../../UI/CopyIcon";
import walletAddressFormat from "../../auxiliary/walletAddressFormat";
import Web3 from "web3";
import RequestTable from "./RequestTable";
import Button from "../../UI/Button";
import RequestModal from "./RequestModal";

function ProjectInfoArea({ project, projectId }) {
  const [dataOnServer, setDataOnServer] = useState({});
  const userCtx = useContext(UserContext);
  const [minContEth, setMinContEth] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const getProjectInfo = async () => {
    const web3 = new Web3(window.ethereum);
    const dataOnServer = await getProjectFromID(`/getProject/${projectId}`);
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
    console.log(project);
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
  }, []);

  const closeModel = () => {
    setshowModal(false);
  };

  const createProjectHandle = () => {
    setshowModal(true);
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
        </div>

        <div className="project-info-area__item info-area budget">
          <div className="budget-item">
            <h5>Total Sponsor</h5>
            <p>{Number(project.sponsors_count)} </p>
          </div>
          <div className="budget-item">
            <h5>Project ID</h5>
            <p>{projectId}</p>
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
          />
        </div>

        <div className="project-info-area__item info-area__btn-area">
          <Button onClick={createProjectHandle}>Create Project Request</Button>
        </div>
      </div>
      {showModal && (
        <RequestModal
          onClose={closeModel}
          projectID={projectId}
          setshowModal={setshowModal}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectInfoArea;
