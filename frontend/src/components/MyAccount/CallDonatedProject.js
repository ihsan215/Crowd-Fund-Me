import React, { useEffect, useContext, useState } from "react";
import Web3 from "web3";
import { ContractInfo } from "../../contract/ContractInfo";
import "../../style/components/MyAccount/ProjectsArea.css";
import Web3Context from "../../web3/Web3-context";
import { Link } from "react-router-dom";

function CallDonatedProject({ userId }) {
  const web3Ctx = useContext(Web3Context);
  const [ProjectSumm, setProjectSumm] = useState([]);

  async function getProjectsSumm() {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );

    const projects = await contractInstance.methods
      .returnDonatedProject()
      .call({
        from: userId,
      });

    if (projects) {
      const newProjects = [];
      setProjectSumm([]);
      projects.map(async (id) => {
        const projectId = Number(id);
        const project = await contractInstance.methods
          .projects(projectId)
          .call({
            from: web3Ctx.address,
          });

        const donatedAmount = await contractInstance.methods
          .returnDonatedAmountAnProject(projectId)
          .call({
            from: web3Ctx.address,
          });

        const projectObj = {
          id: projectId,
          title: project.title,
          totalDonate: web3.utils.fromWei(Number(donatedAmount), "ether"),
        };
        newProjects.push(projectObj);
        if (newProjects.length === projects.length) {
          setProjectSumm(newProjects);
        }
      });
    }
  }

  useEffect(() => {
    getProjectsSumm();
  }, []);

  return (
    <React.Fragment>
      {ProjectSumm.length > 0 ? (
        ProjectSumm.map((item) => {
          return (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.totalDonate} ETH</td>
              <td>
                <Link
                  style={{ textDecoration: "none", color: "#202020" }}
                  to={`/${userId}/${item.id}`}
                >
                  Go to project&rarr;
                </Link>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <th scope="row">No Donated Project</th>
        </tr>
      )}
    </React.Fragment>
  );
}

export default CallDonatedProject;
