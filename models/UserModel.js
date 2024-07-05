const mongoose = require("mongoose");
const { isEmail } = require("validator");


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Minimum password length is 6 character"],
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;