const express = require("express");
const router = express.Router();

const contactsControllers = require("../../../controllers");

router
  .get("/", contactsControllers.getAll)
  .post("/", contactsControllers.createOne);

router
  .get("/:contactId", contactsControllers.getById)
  .patch("/:contactId", contactsControllers.updateById)
  .delete("/:contactId", contactsControllers.removeById);
module.exports = router;
