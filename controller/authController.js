const UserModel = require("./../models/UserModel");
const jwt = require("jsonwebtoken");

//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect email") {
    errors.email = "This email is not registered";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //duplicate error
  if (err.code === 11000) {
    errors.email = "This is already a registered email";
    return errors;
  }

  //validation errors
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}


const maxAge = 3* 24 * 60* 60
const createToken = (id) => {
  return jwt.sign({ id }, "next IDMb secret", {
    expiresIn: maxAge
  } )
}


//getting sign up
module.exports.signup_get = (req, res) => {
  res.status(200).json({ status: "success", page: "Sign up" });
};

//getting log in
module.exports.login_get = (req, res) => {
  res.status(200).json({ status: "success", page: "Log in" });
};

//posting sign up
module.exports.signup_post =async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);
    res
      .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
      .status(201)
      .json({ user: user._id, token });
        console.log("The new user is: ", user);
        console.log("and the token is: ", token);
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
};

//posting login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id)
    res
      .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
      .status(200)
      .json({ user: user._id, token });
    
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({errors})
  }
};


module.exports.logout_get = (req, res) => {
 try {
   res
     .cookie("jwt", "", { maxAge: 1 })
     .status(200)
     .json({ status: "log outed" });
 } catch (error) {
  res.status(400).json({error: "can not log out the user for: ", error})
 }
}