const express = require("express");

const projectController = require("../controllers/project");

const router = express.Router();

router.post("/uploadProject/:projectID", projectController.postProject);

module.exports = router;
