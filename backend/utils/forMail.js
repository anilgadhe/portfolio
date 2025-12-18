const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "gadheanil57@gmail.com",
    clientId: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});


module.exports = transporter;