const Contacts = require("../schemas/contacts");

const getAll = async (req, res, next) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    const userId = req.user.id;
    const {
      docs: tasks,
      totalDocs: total,
      totalPages,
    } = await Contacts.paginate(
      { owner: userId },
      {
        limit,
        page,
        populate: { path: "owner", select: "name email subscription -_id" },
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        tasks,
        total,
        limit: Number(limit),
        page: Number(page),
        totalPages,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  try {
    const result = await Contacts.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: "owner",
      select: "name email subscription -_id",
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

const createOne = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await Contacts.create({
      ...req.body,
      owner: userId,
    });
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
  const userId = req.user.id;
  const { contactId } = req.params;

  try {
    const result = await Contacts.findOneAndDelete({
      _id: contactId,
      owner: userId,
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
  const userId = req.user.id;
  const { contactId } = req.params;
  try {
    const result = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
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
