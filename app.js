const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
// const fs = require("fs/promises");
require("dotenv").config();
// const multer = require("multer");
// const jimp = require("jimp");

// const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
// const IMG_DIR = path.join(__dirname, "public", "images");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes("image")) {
//       cb(null, true);
//       return;
//     }
//     cb(null, false);
//   },
// });

const contactsRouter = require("./routes/api/contacts");
const authUserRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");

const app = express();

// app.post("/upload", upload.single("avatar"), async (req, res, next) => {
//   console.log(req.file);
//   console.log(req.body);
//   if (req.file) {
//     const img = await jimp.read(req.file.path);
//     await img
//       .autocrop()
//       .cover(
//         250,
//         250,
//         jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
//       )
//       .writeAsync(req.file.path);
//     await fs.rename(req.file.path, path.join(IMG_DIR, req.file.originalname));
//   }
//   res.status(200);
// });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.urlencoded({ extended: false }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/auth", authUserRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
