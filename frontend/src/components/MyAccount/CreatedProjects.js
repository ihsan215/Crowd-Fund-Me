import React, { useEffect, useContext, useState } from "react";

import "../../style/components/MyAccount/ProjectsArea.css";
import Web3Context from "../../web3/Web3-context";

function CreatedProjects() {
  const web3Ctx = useContext(Web3Context);
  const [ProjectSumm, setProjectSumm] = useState([]);

  const getProjectData = async () => {
    if (web3Ctx.contractInstance?.methods) {
      const projects = await web3Ctx.contractInstance?.methods
        .returnProject()
        .call({
          from: web3Ctx.address,
        });
      console.log(projects);
      if (projects) {
        projects.map(async (item) => {
          const id = Number(Number(item));
          const project = await web3Ctx.contractInstance?.methods
            .projects(id)
            .call({
              from: web3Ctx.address,
            });
          const title = project.title;
          const totalFund = Number(project.current_amount);

          setProjectSumm((ProjectSumm) => [
            ...ProjectSumm,
            { id, title, totalFund },
          ]);
        });
      }
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <React.Fragment>
      <div className="table-area">
        <h3>Created Projects</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Title</th>
              <th scope="col">Total Fund</th>
            </tr>
          </thead>
          <tbody>
            {ProjectSumm.map((item) => {
              console.log(ProjectSumm);
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.totalFund}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CreatedProjects;
