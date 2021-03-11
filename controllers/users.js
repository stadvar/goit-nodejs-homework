const Users = require("../schemas/users");
// const jwt = require("jsonwebtoken");
const jimp = require("jimp");

const fs = require("fs/promises");
const path = require("path");
const IMG_DIR = path.join(process.cwd(), "public", "images");

const getCurrentUser = async (req, res, next) => {
  // const token = req.get("Authorization")?.split(" ")[1];
  // const { id } = jwt.decode(token);
  const { id } = req.user;
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
  // const token = req.get("Authorization")?.split(" ")[1];
  // const { id } = jwt.decode(token);
  const { id } = req.user;
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

const updateAvatars = async (req, res, next) => {
  // const token = req.get("Authorization")?.split(" ")[1];
  // const { id } = jwt.decode(token);
  const { id } = req.user;

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
      const { avatarURL: oldAvatarURL } = await Users.findOne({ _id: id });
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
      await Users.findOneAndUpdate({ _id: id }, { avatarURL: newAvatarURL });
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
module.exports = { getCurrentUser, updateCurrentUser, updateAvatars };
