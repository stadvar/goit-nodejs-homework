const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (data.message) {
      res.status(404).json(data);
    } else {
      res.json(data);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const data = await addContact(nanoid(4), name, email, phone);
  if (data.message) return res.status(400).json(data);
  return res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId);
    if (data.message === "Not found") return res.status(404).json(data);
    if (data.message === "contact deleted") return res.json(data);
  } catch (e) {
    next(e);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const data = await updateContact(req.params.contactId, req.body);
    if (data.message === "Not found") return res.status(404).json(data);
    if (data.message === "missing fields") {
      return res.status(400).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
