const Users = require("../model/users");
const jimp = require("jimp");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const IMG_DIR = path.join(process.cwd(), "public", "images");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      user: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        name: newUser.name,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
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
  await Users.updateToken(id, token);
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
  await Users.updateToken(id, null);
  return res.status(204).json({});
};
//---

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
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
  try {
    const user = await Users.updateById(req.user.id, req.body);
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

const updateAvatars = async (req, res, next) => {
  try {
    if (req.file) {
      // read file and autocrop
      const img = await jimp.read(req.file.path);
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(req.file.path);
      // put file to public directory
      await fs.rename(req.file.path, path.join(IMG_DIR, req.file.filename));
      // create URL to avatar file
      const newAvatarURL = `/images/${req.file.filename}`;
      // get old URL of avatar from DB
      const { avatarURL: oldAvatarURL } = await Users.findById(req.user.id);
      // parse filename from URL
      const filename = path.parse(oldAvatarURL).base;
      try {
        // delete previous file of avatar if it exists
        await fs.access(path.join(IMG_DIR, filename));
        await fs.unlink(path.join(IMG_DIR, filename));
      } catch {
        console.log("file of avatar is not exists");
      }
      // update avatar URL in DB
      await Users.updateAvatar(req.user.id, newAvatarURL);
      res.json({
        status: "success",
        code: 200,
        avatarURL: `/images/${req.file.filename}`,
      });
    }
  } catch (e) {
    next(e);
  }
};
module.exports = {
  reg,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
  updateAvatars,
};
