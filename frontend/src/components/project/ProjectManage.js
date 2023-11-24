import { AJAXCall } from "../../auxiliary/FetchingData";

export async function getProjectFromID(url) {
  const projectData = await AJAXCall(url, {
    method: "GET",
    mode: "no-cors",
  });
  return projectData;
}

export async function getProjectsWithFilter(url, filter) {
  const projectData = await AJAXCall(url, {
    method: "POST",
    mode: "no-cors",
    body: filter,
  });
  return projectData;
}
