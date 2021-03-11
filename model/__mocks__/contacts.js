const { tasks } = require("./data");
const getAll = jest.fn((userId, { limit = 5, page = 1 }) => {
  return { tasks, total: tasks.length, limit, page };
});

const getById = jest.fn((id, userId) => {
  const [contact] = tasks.filter((el) => String(el._id) === String(id));
  return contact;
});

const create = jest.fn((body) => {});

const remove = jest.fn((id, userId) => {});

const update = jest.fn((id, body, userId) => {});

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
