const Contacts = require("../schemas");
const getAll = async (req, res, next) => {
  try {
    const results = await Contacts.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contacts.findOne({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      data: { task: result },
    });
  } catch (e) {
    next(e);
  }
};

const createOne = async (req, res, next) => {
  try {
    const result = await Contacts.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      tasks: { task: result },
    });
  } catch (e) {
    next(e);
  }
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contacts.findOneAndDelete({
      _id: contactId,
    });
    res.json({
      status: "success",
      code: 200,
      data: { task: result },
    });
  } catch (e) {
    next(e);
  }
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contacts.findOneAndUpdate(
      { _id: contactId },
      { ...req.body },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: { task: result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, getById, createOne, removeById, updateById };
