require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const mongoose = require("mongoose");
const transporter = require("./utils/forMail");
const app = express();
const PORT = process.env.PORT || 8000;



connection(process.env.Mongo_URL).then(() => {
  console.log("successfully connected with atlas");

})
  .catch((err) => {
    console.log(`failed to connect: ${err}`);

  })

const allowedOrigins = [
  "https://anil-port-folio-eight.vercel.app", // production frontend
  "http://localhost:5173",                     // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests (Postman)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("home route");
})

app.post("/register", async (req, res) => {
  try {
    const { userName, email, message } = req.body;

    if (!userName || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }


    const newUser = new User({ userName, email, message });
    await newUser.save();


    res.status(200).json({ msg: "Message submitted successfully ✅", user: userName });


    transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `New message from ${userName}`,
      text: `You received a new message from ${userName} (${email}):\n\n${message}`,
    }).catch(err => {
      console.error("Mail error:", err);
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.use((req, res) => {
  res.status(400).json("page Not Found");
})


async function connection(url) {
  await mongoose.connect(url);
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);

})



