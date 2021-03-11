const User = require("./schemas/users");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const updateById = async (id, data) => {
  return await User.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

module.exports = {
  updateById,
  findById,
  create,
  updateToken,
  findByEmail,
  updateAvatar,
};
