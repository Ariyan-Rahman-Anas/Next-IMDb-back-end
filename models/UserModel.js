const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
      minlength: [6, "Minimum password length is 6 character"],
    },
  },
  { timestamps: true, versionKey: false }
);

//fire a function after doc saved to db
// userSchema.post("save", function (doc, next) {
//     console.log("new user was created and saved", doc)
//     next()
// })

//fire a function before save to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    console.log("user about to be created and saved", this)
    next();
})


// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email})
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }throw Error("Incorrect password");
  }throw Error("Incorrect email")
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;