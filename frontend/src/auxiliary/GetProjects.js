import Web3 from "web3";
import { ContractInfo } from "../contract/ContractInfo";
import { AJAXCall } from "./FetchingData";
import { getProjectFromID } from "../components/project/ProjectManage";

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
  if (Number(lastProjectId) > 6) {
    poupularProjectsLen = 6;
  }

  const PopularProjects = [];

  for (let i = 0; i < poupularProjectsLen; i++) {
    const project = await contractInstance.methods.projects(i).call({
      from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
    });

    const userData = await AJAXCall(`/myAccount/${project.project_owner}`, {
      method: "GET",
      mode: "no-cors",
    });

    const projectServer = await getProjectFromID(`/getProject/${i}`);

    const id = i;
    const title = project.title;
    const description = project.description;
    const author = userData.name;
    const url = projectServer.mainPageImg;
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
    });
  }

  return PopularProjects;
};

export const PopularProjects = [
  {
    id: 0,
    title: "Lorem ipsum - 1",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio labore sapiente eius iste sunt, unde incidunt blanditiis officiis facere, aspernatur repudiandae voluptas reiciendis eaque",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp",
    author: "ezgi taş",
  },

  {
    id: 1,
    title: "Lorem ipsum - 2",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio ",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp",
    author: "ali ihsan taş",
  },

  {
    id: 2,
    title: "Lorem ipsum - 3",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio ",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(33).webp",
    author: "ali veli",
  },

  {
    id: 3,
    title: "Lorem ipsum -4 ",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio labore sapiente eius iste sunt, unde incidunt blanditiis officiis facere, aspernatur repudiandae voluptas reiciendis eaque aliquam quia est!",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(33).webp",
    author: "ezgi erol",
  },

  {
    id: 4,
    title: "Lorem ipsum-5",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio labore sapiente eius iste sunt, unde incidunt blanditiis officiis facere, aspernatur repudiandae voluptas reiciendis eaque aliquam quia est!",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(33).webp",
    author: "ali ezgi taş",
  },

  {
    id: 5,
    title: "Lorem ipsum-6",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quae nostrum, optio labore sapiente eius iste sunt, unde incidunt blanditiis officiis facere, aspernatur repudiandae voluptas reiciendis eaque aliquam quia est!",
    url: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(33).webp",
    author: "ezgi ali erol",
  },
];
