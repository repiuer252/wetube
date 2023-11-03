const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { multerUpload } = require("./Router/Video");
const videoController = require("./Controller/videoController");
require("dotenv").config();

//Database
require("./Database/db");

// CORS
app.use(cors());

//Body-Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routers

// User
app.use("", require("./Router/User"));

// Video
app.use("/video", require("./Router/Video"));

// Comment
app.use("/comment", require("./Router/Comment"));

// watchLater
app.use("/watchLater", require("./Router/watchLater"));

// history
app.use("/history", require("./Router/History"));

// playList
app.use("/playList", require("./Router/playList"));

const port = process.env.PORT || 8000;
app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running on port " + port);
});
