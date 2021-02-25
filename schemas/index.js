const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// установка схемы
const contactsScheme = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: { type: String, required: [true, "Phone is required"] },
    subscription: { type: String, default: "free" },
    password: { type: String, required: [true, "Password is required"] },
    token: { type: String, default: "" },
  },
  { versionKey: false }
);
const Contacts = model("contact", contactsScheme);
module.exports = Contacts;
