const express = require("express");
const router = express.Router();
const validate = require("./validation");
const guard = require("../../../helpers/guard");

const contactsControllers = require("../../../controllers/contacts");

router
  .get("/", guard, contactsControllers.getAll)
  .post("/", guard, validate.createContact, contactsControllers.createOne);

router
  .get("/:contactId", guard, contactsControllers.getById)
  .patch(
    "/:contactId",
    guard,
    validate.updateContact,
    contactsControllers.updateById
  )
  .delete("/:contactId", guard, contactsControllers.removeById);
module.exports = router;
