const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // type: "OAuth2",
    user: process.env.MAIL_USER,
    pass: process.env.EMAIL_PASS,
    // clientId: process.env.Client_ID,
    // clientSecret: process.env.Client_Secret,
    // refreshToken: process.env.REFRESH_TOKEN,
  },
});


module.exports = transporter;