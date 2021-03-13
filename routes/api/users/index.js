const express = require("express");
const router = express.Router();
const validate = require("./validation");
require("dotenv").config();
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/multer");

const usersControllers = require("../../../controllers/users");

router.get("/current", guard, usersControllers.getCurrentUser);
router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  usersControllers.updateAvatars
);

router.patch(
  "/",
  guard,
  validate.updateUser,
  usersControllers.updateCurrentUser
);

module.exports = router;
