module.exports.signup_get = (req, res) => {
    res.status(200).json({ status: "success", page: "Sign up" });
}

module.exports.login_get = (req, res) => {
    res.status(200).json({ status: "success", page: "Log in" });
}

module.exports.signup_post = (req, res) => {
    res.status(200).json({ status: "new sign up" });
}

module.exports.login_post = (req, res) => {
  res.status(200).json({ status: "user login" });
};