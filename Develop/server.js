const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//changed to include env and mongo port
const PORT = process.env.PORT || 27017;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//need to change config vars in heroku to reflect atlas information
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {useNewUrlParser: true, useUnifiedTopology: true});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});