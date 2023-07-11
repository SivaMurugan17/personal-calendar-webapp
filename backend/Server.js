const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/login", require("./routes/loginRoutes"));
app.use("/signup", require("./routes/signupRoutes"));
app.use("/birthday", require("./routes/birthdayRoutes"));
app.use("/deadline", require("./routes/deadlineRoutes"));
app.use("/journal", require("./routes/journalRoutes"));

app.listen(port, () => console.log(`Server started at port ${port}`));
