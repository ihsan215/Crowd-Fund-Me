const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config({ path: ".env" });
const { SEND_MAIL_API } = process.env;

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SEND_MAIL_API,
    },
  })
);

exports.postContactUs = async (req, res, next) => {
  const mail = req.body.mail;
  transporter
    .sendMail({
      to: mail,
      from: "aliihsantas34@gmail.com",
      subject: "CrowdFundMe Contact-Us",
      html: "<p>We got your mail. Thank you for your interest.</p>",
    })
    .then(() => {
      res.status(200).json({
        message: "sended",
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: "not send",
      });
    });
};
