const express = require("express");

const contactUsController = require("../controllers/contactUs");

const router = express.Router();

router.post("/ContactUs", contactUsController.postContactUs);

module.exports = router;
