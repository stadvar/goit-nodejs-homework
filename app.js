const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authUserRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.urlencoded({ extended: false }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/auth", authUserRouter);
app.use("/api/contacts", contactsRouter);

// process.on("unhandledRejection", (reason, promise) => {
//   console.log("Unhandled Rejection at:", promise, "reason:", reason);
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
