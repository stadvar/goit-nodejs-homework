const Contacts = require("../model/contacts");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.getAll(userId, req.query);
    return res.json({
      status: "success",
      code: 200,
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getById(req.params.contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const createOne = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.create({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const removeById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.remove(req.params.contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.update(
      req.params.contactId,
      req.body,
      userId
    );
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, getById, createOne, removeById, updateById };
