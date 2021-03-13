const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const validate = require("./validation");
const usersControllers = require("../../../controllers/users");

router
  .post("/register", validate.createUser, usersControllers.reg)
  .post("/login", validate.loginUser, usersControllers.login)
  .post("/logout", guard, usersControllers.logout);
module.exports = router;
