const app = require("../app");
const db = require("../db");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const PORT = process.env.PORT || 3000;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server was running on port: ${PORT}`);
    await createFolderIsNotExist(UPLOAD_DIR);
  });
}).catch((err) => {
  console.log(`Server wasn't running. ${err.message}`);
});
