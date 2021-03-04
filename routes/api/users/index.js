const express = require("express");
const router = express.Router();
const validate = require("./validation");
require("dotenv").config();
const guard = require("../../../helpers/guard");

const usersControllers = require("../../../controllers/users");

router.get("/current", guard, usersControllers.getCurrentUser);

router.patch(
  "/",
  guard,
  validate.updateUser,
  usersControllers.updateCurrentUser
);

module.exports = router;
