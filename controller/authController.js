const UserModel = require("./../models/UserModel");

//error handling
const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = { email: "", password: "" };

    //duplicate error
    if (err.code === 11000) {
        errors.email = "This is already a registered email"
        return errors;
    }

    //validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(
          ({ properties }) => (errors[properties.path] = properties.message)
        );
    }
    return errors
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
        res.status(201).json(user);
        console.log("The new user is: ", user);
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
};

//posting login
module.exports.login_post = (req, res) => {
  res.status(200).json({ status: "user login" });
};