import React, { useState } from "react";

import { getProjectFromID } from "./ProjectManage";

function ProjectInfoArea({ project, projectId }) {
  const [dataOnServer, setDataOnServer] = useState({});

  const getProjectInfo = async () => {
    const dataOnServer = await getProjectFromID(`/getProject/${projectId}`);
    setDataOnServer(dataOnServer);
    console.log(dataOnServer);
  };

  useState(() => {
    getProjectInfo();
  }, []);

  return (
    <React.Fragment>
      <div className="project-info-area">
        <div className="project-info-area__item title-area">
          <h1>{project.title}</h1>
          <img src={dataOnServer?.mainPageImg} />
        </div>
        <div className="project-info-area__item"></div>
        <div className="project-info-area__item"></div>
        <div className="project-info-area__item"></div>
      </div>
    </React.Fragment>
  );
}

export default ProjectInfoArea;
