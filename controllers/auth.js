const Users = require("../schemas/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new Users({ name, email, password });
    const result = await newUser.save();
    return res.status(201).json({
      status: "success",
      code: 201,
      user: {
        id: result.id,
        email: result.email,
        subscription: result.subscription,
        name: result.name,
        avatarURL: result.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user || !(await user.validPassword(password))) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Invalid credentials",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
  await Users.updateOne({ _id: id }, { token });
  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: { email: user.email, subscription: user.subscription },
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  // updateToken
  await Users.updateOne({ _id: id }, { token: null });
  return res.status(204).json({});
};

module.exports = {
  reg,
  login,
  logout,
};
