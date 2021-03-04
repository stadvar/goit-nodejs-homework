const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);
contactsScheme.plugin(mongoosePaginate);
const Contacts = model("contact", contactsScheme);

module.exports = Contacts;
