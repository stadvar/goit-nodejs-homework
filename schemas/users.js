const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 6;
const usersScheme = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      require: [true, "Email is required "],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: { type: String, default: null },
  },
  { versionKey: false }
);
usersScheme.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});
usersScheme.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const Users = model("user", usersScheme);
module.exports = Users;
