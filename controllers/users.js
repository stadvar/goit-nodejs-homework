const Users = require("../schemas/users");
const jwt = require("jsonwebtoken");

const getCurrentUser = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const { id } = jwt.decode(token);
  try {
    const user = await Users.findOne({ _id: id });
    return res.status(200).json({
      status: "success",
      code: 200,
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateCurrentUser = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const { id } = jwt.decode(token);
  try {
    const user = await Users.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
module.exports = { getCurrentUser, updateCurrentUser };
