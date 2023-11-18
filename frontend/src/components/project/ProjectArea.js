import React, { useState } from "react";
import Web3 from "web3";
import { ContractInfo } from "../../contract/ContractInfo";
import { useParams, useNavigate } from "react-router-dom";
import ProjectInfoArea from "./ProjectInfoArea";
import Spinning from "../../UI/Spinning";

import "../../style/Project.css";

function ProjectArea() {
  const { projectId, userId } = useParams();
  const [msg, setMsg] = useState("Loading ...");
  const [project, setProject] = useState(undefined);
  const naviage = useNavigate();

  async function getProject() {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    try {
      const project = await contractInstance.methods.projects(projectId).call({
        from: userId,
      });

      setProject(project);
    } catch (e) {
      setMsg("Invalid Request");
      setTimeout(() => {
        naviage("/");
      }, 2000);
    }
  }

  useState(() => {
    getProject();
  }, []);

  return (
    <React.Fragment>
      {project ? (
        <ProjectInfoArea project={project} projectId={projectId} />
      ) : (
        <div className="loading-area">
          <h1>{msg}</h1>
          <Spinning />
        </div>
      )}
    </React.Fragment>
  );
}

export default ProjectArea;
