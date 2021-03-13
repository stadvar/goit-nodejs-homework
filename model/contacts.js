const Contacts = require("./schemas/contacts");

const getAll = async (userId, { limit = 5, page = 1 }) => {
  const { docs: tasks, totalDocs: total, totalPages } = await Contacts.paginate(
    { owner: userId },
    {
      limit,
      page,
      populate: { path: "owner", select: "name email subscription -_id" },
    }
  );
  return {
    tasks,
    total,
    limit: Number(limit),
    page: Number(page),
    totalPages,
  };
};

const getById = async (id, userId) => {
  const result = await Contacts.findOne({
    _id: id,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email subscription -_id",
  });
  return result;
};

const create = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const update = async (id, body, userId) => {
  const result = await Contacts.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const remove = async (id, userId) => {
  const result = await Contacts.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
