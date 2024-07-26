const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "next IDMb secret", (err, decodedToken) => {
      if (err) {
        console.log("Token error, redirecting to login");
        res.status(401).json({ message: "Unauthorized", redirect: "/log-in" });
      } else {
        console.log("decodedToken is: ", decodedToken);
        next();
      }
    });
  } else {
    console.log("No token, redirecting to login");
    res.status(401).json({ message: "Unauthorized", redirect: "/log-in" });
  }
};
module.exports = { requireAuth };