// LIBRARIES INPORT SECTION
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// CONFIGURE SERVER
const app = express();
const corsOptions = {
  origin: "localhost:3000",
};

// CONFIGURATION OF LIBRARIES
app.use("/upload", express.static(__dirname + "/upload")); // TO ACCESS IMAGE IN BROWSER USING IMAGE URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());// (MIDDLEWARE) THAT PARSES THE INCOMING REQUEST BODIES IN A MIDDLEWARE BEFORE YOUR HANDLERS.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload()); // FOR THE FILE UPLOAD
app.use(cors(corsOptions));// MIDDLEWARE

// SYNC DB
const db = require("./app/models");
db.sequelize.sync();

// SIMPLE ROOT RESPONSE
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RestApis with Express,MySQL,NodeJS,Sequelize" });
});

// WE CAN SET HTML FILE RATHER THAN THE JSON OBJECT , REFER BELOW CODE FOR THAT.
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// ENABLE ALL ROUTES FROM OTHER FILE WHICH IS LOCATED IN app/index.js
// app.use("/", require("./app/routes"));
app.use("/", require("./app/routes"));


// SERVER WITH PORT
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}/`);
});