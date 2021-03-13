const { tasks } = require("./data");
const getAll = jest.fn((userId, { limit = 5, page = 1 }) => {
  return { tasks, total: tasks.length, limit, page };
});

const getById = jest.fn((id, userId) => {
  const [contact] = tasks.filter((el) => String(el._id) === String(id));
  return contact;
});

const create = jest.fn((body) => {
  const newContact = { ...body, _id: "604a27ea543024073c307a66" };
  tasks.push(newContact);
  return newContact;
});

const remove = jest.fn((id, userId) => {
  const index = tasks.findIndex((el) => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [contact] = tasks.splice(index, 1);
  return contact;
});

const update = jest.fn((id, body, userId) => {
  let [contact] = tasks.filter((el) => String(el._id) === String(id));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
