import { AJAXCall } from "../../auxiliary/FetchingData";

export async function getProjectFromID(url) {
  const projectData = await AJAXCall(url, {
    method: "GET",
    mode: "no-cors",
  });
  return projectData;
}
