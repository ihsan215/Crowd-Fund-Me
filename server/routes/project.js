const express = require("express");

const projectController = require("../controllers/project");

const router = express.Router();

router.post("/uploadProject/:projectID", projectController.postProject);
router.get("/getProject/:projectID", projectController.getproject);
router.post("/getProjects", projectController.postProjects);

module.exports = router;
