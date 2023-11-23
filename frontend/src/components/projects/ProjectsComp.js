import React, { useState, useEffect } from "react";
import { ContractInfo } from "../../contract/ContractInfo.js";
import Web3 from "web3";
import ProjectCart from "../../UI/ProjectCart.js";

import { getPaginationProject } from "../../auxiliary/GetProjects.js";

import "../../style/Projects.css";
import Spinning from "../../UI/Spinning.js";

const ITEM_PER_PAGE = 12;

function ProjectsComp() {
  const [totalProject, setTotalProject] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [PopularProjects, setPopularProjects] = useState([]);

  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(
    ContractInfo.ABI,
    ContractInfo.ADDRESS
  );

  async function getTotalProject() {
    const TotalProject = await contractInstance.methods
      .Project_ID_Count()
      .call({
        from: "0x32387FA2367E3aBB0A1f122D1e91fb8d3ed5Da1B",
      });
    setTotalProject(Number(TotalProject));
  }

  async function getProjects(page) {
    const PopularProjects = await getPaginationProject(page, ITEM_PER_PAGE);

    setPopularProjects(PopularProjects);
  }

  useEffect(() => {
    getTotalProject();
    getProjects(1);
  }, []);

  const displayPage = (totalProject) => {
    const pageNumber = Math.ceil(Number(totalProject) / ITEM_PER_PAGE);

    return (
      <nav aria-label="Page navigation example" className="pagination-nav">
        <ul class="pagination pagination-list">
          <li
            class={`page-item pagination-item ${
              pageNumber == 1 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link pagination-button "
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item pagination-item">
            <button
              class="page-link pagination-button"
              href="#"
              aria-label="Previous"
            >
              1
            </button>
          </li>
          <li
            class={`page-item pagination-item ${
              pageNumber == 1 ? "disabled" : ""
            }`}
          >
            <button
              class="page-link pagination-button"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <React.Fragment>
      <div className="project-page__projects">
        <h3 class="heading">CrowdFundMe Projects</h3>
        <div class="container">
          {PopularProjects.length > 0 ? (
            <div class="product-row">
              {PopularProjects.map((item) => {
                return (
                  <ProjectCart
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    url={item.url}
                    author={item.author}
                    projectURL={item.projectURL}
                    ownerURL={item.ownerURL}
                  />
                );
              })}
            </div>
          ) : (
            <Spinning />
          )}
        </div>
      </div>
      {displayPage(totalProject)}
    </React.Fragment>
  );
}

export default ProjectsComp;
