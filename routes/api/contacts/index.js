const express = require("express");
const router = express.Router();

const guard = require("../../../helpers/guard");

const contactsControllers = require("../../../controllers/contacts");

router
  .get("/", guard, contactsControllers.getAll)
  .post("/", guard, contactsControllers.createOne);

router
  .get("/:contactId", guard, contactsControllers.getById)
  .patch("/:contactId", guard, contactsControllers.updateById)
  .delete("/:contactId", guard, contactsControllers.removeById);
module.exports = router;
