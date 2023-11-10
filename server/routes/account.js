const express = require("express");
const fileUpload = require("express-fileupload");

const userController = require("../controllers/user");

const router = express.Router();

router.use(fileUpload());

router.post("/myAccount/:userId", userController.postUserInfo);

module.exports = router;
