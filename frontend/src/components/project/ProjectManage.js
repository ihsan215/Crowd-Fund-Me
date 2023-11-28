import { AJAXCall } from "../../auxiliary/FetchingData";

export async function getProjectFromID(url) {
  const projectData = await AJAXCall(url, {
    method: "GET",
  });
  return projectData;
}

export async function getProjectsWithFilter(url, filter) {
  const projectData = await AJAXCall(url, {
    method: "POST",
    body: filter,
  });
  return projectData;
}
