import Web3 from "web3";
import { ContractInfo } from "../contract/ContractInfo";
import { AJAXCall } from "./FetchingData";
import {
  getProjectFromID,
  getProjectsWithFilter,
} from "../components/project/ProjectManage";

export const getPopularProjects = async () => {
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(
    ContractInfo.ABI,
    ContractInfo.ADDRESS
  );

  const lastProjectId = await contractInstance.methods.Project_ID_Count().call({
    from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
  });
  let poupularProjectsLen = Number(lastProjectId);
  if (Number(lastProjectId) > 3) {
    poupularProjectsLen = 3;
  }

  const PopularProjects = [];

  for (let i = 0; i < poupularProjectsLen; i++) {
    const project = await contractInstance.methods.projects(i).call({
      from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
    });

    const userData = await AJAXCall(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/myAccount/${project.project_owner}`,
      {
        method: "GET",
      }
    );

    const projectServer = await getProjectFromID(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/getProject/${i}`
    );

    const id = i;
    const title = project.title;
    const description = project.description;
    const author = userData.name;
    const url = projectServer.mainPageImg;
    const categoria = projectServer.categoria;
    const projectURL = `/${project.project_owner}/${id}`;
    const ownerURL = `/myAccount/${project.project_owner}`;

    PopularProjects.push({
      id,
      title,
      description,
      author,
      url,
      projectURL,
      ownerURL,
      categoria,
    });
  }

  return PopularProjects;
};

export const getPaginationProject = async (page, item_per_page, filter) => {
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(
    ContractInfo.ABI,
    ContractInfo.ADDRESS
  );

  const lastProjectId = await contractInstance.methods.Project_ID_Count().call({
    from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
  });

  const project_begin = (page - 1) * item_per_page;
  let project_end = project_begin + item_per_page;
  if (project_end > Number(lastProjectId)) {
    project_end = lastProjectId;
  }

  filter.append("idBegin", project_begin);
  filter.append("idEnd", project_end);
  filter.append("item_per_page", item_per_page);

  const projectServer = await getProjectsWithFilter(
    `https://crodfundme-server-21625d4d752e.herokuapp.com/getProjects`,
    filter
  );
  const projectsOnServer = projectServer.projects;
  const len = projectsOnServer ? projectsOnServer.length : 0;

  const PopularProjects = [];

  for (let i = 0; i < len; i++) {
    const item = projectsOnServer[i];
    const project = await contractInstance.methods
      .projects(item.projectId)
      .call({
        from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
      });

    const userData = await AJAXCall(
      `https://crodfundme-server-21625d4d752e.herokuapp.com/myAccount/${project.project_owner}`,
      {
        method: "GET",
      }
    );

    const id = item.projectId;
    const title = project.title;
    const description = project.description;
    const author = userData.name;
    const url = item.mainPageImg;
    const projectURL = `/${project.project_owner}/${id}`;
    const categoria = item.categoria;
    const ownerURL = `/myAccount/${project.project_owner}`;

    PopularProjects.push({
      id,
      title,
      description,
      author,
      url,
      projectURL,
      ownerURL,
      categoria,
    });
  }

  return PopularProjects;
};
