const Project = require("../models/project");
const User = require("../models/user");

exports.postProject = async (req, res, next) => {
  const projectId = req.params.projectID;
  const walletId = req.body.walletId;
  const query = await Project.findOne({ projectId: projectId });
  const queryUser = await User.findOne({ walletId: walletId });

  if (query) {
    query.mainPageImg = req.body.mainPageImg;
    query.categoria = req.body.categoria;
    query.projectMaterial = req.body.projectMaterial;
    query.projectSummary = req.body.projectSummary;
    query.hash = req.body.hash;
    await queryUser.addProject(projectId);
    await query.save();
  } else {
    const project = new Project({
      projectId: projectId,
      categoria: req.body.categoria,
      mainPageImg: req.body.mainPageImg,
      projectSummary: req.body.projectSummary,
      projectMaterial: req.body.projectMaterial,
      hash: req.body.hash,
    });
    await queryUser.addProject(projectId);
    await project.save();
  }

  res.status(200).json({
    message: "ok",
  });
};

exports.getproject = async (req, res, next) => {
  const projectId = req.params.projectID;
  const query = await Project.findOne({ projectId: projectId });
  if (query) {
    res.status(200).json({
      message: "ok",
      mainPageImg: query.mainPageImg,
      categoria: query.categoria,
      projectMaterial: query.projectMaterial,
      city: query.city,
      projectSummary: query.projectSummary,
      hash: query.hash,
    });
  } else {
    res.status(200).json({
      message: "not found",
    });
  }
};

exports.postProjects = async (req, res, next) => {
  const filter = req.body.filter;
  const idBegin = req.body.idBegin;

  const item_per_page = req.body.item_per_page;

  const filterArr = filter.split(",");

  if (filterArr[0] == "") {
    const projects = await Project.find().skip(idBegin).limit(item_per_page);
    res.status(200).json({
      message: "ok",
      projects,
    });
    return;
  } else {
    const projects = await Project.find().skip().limit(item_per_page);
    const sendProjects = [];

    projects.map((item) => {
      if (filterArr.includes(item.categoria)) {
        sendProjects.push(item);
      }
    });

    res.status(200).json({
      message: "ok",
      projects: sendProjects,
    });
    return;
  }
};
