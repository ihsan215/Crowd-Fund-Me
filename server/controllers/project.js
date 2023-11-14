const Project = require("../models/project");

exports.postProject = async (req, res, next) => {
  console.log("Post Project");
  const projectId = req.params.projectID;
  const query = await Project.findOne({ projectId: projectId });
  if (query) {
    query.mainPageImg = req.body.mainPageImg;
    query.categoria = req.body.categoria;
    query.projectMaterial = req.body.projectMaterial;
    query.projectSummary = req.body.projectSummary;
    if (req.files) {
      query.profileImg = req.files.profileImg;
    }

    query.save();
  } else {
    const project = new Project({
      projectId: projectId,
      categoria: req.body.categoria,
      mainPageImg: req.body.mainPageImg,
      projectSummary: req.body.projectSummary,
      projectMaterial: req.body.projectMaterial,
    });
    project.save();
  }

  res.status(200).json({
    message: "ok",
  });
};
