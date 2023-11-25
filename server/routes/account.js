const express = require("express");
const fileUpload = require("express-fileupload");

const userController = require("../controllers/user");

const router = express.Router();

router.use(fileUpload());

router.post("/myAccount/:userId", userController.postUserInfo);
router.post("/myAccount/JobInfo/:userId", userController.postUserJobInfo);
router.get("/myAccount/:userId", userController.getUserInfo);
router.get("/getUsersearch/:filter", userController.getUsersearch);

module.exports = router;
