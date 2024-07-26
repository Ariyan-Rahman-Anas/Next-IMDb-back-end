const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.APP_PORT || 9001 ;
require("dotenv").config();
const dbConfig = require("./src/config/dbConfig");
dbConfig();

const authRoute = require("./routes/authRoute");
const watchListRoute = require("./routes/watchListRoute");

const app = express();

//basic middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://next-imdb.netlify.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));


//root route
app.get("/", (req, res) => {
    res.send({message: "Next-IMDb server application is running..." })
})

//server testing
app.listen(port, () => {
    console.log(`Next-IMDb app is running on:  http://localhost:${port}`);
})

// routes
app.use(authRoute);
app.use(watchListRoute);


//cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("set-cookie", "newUser = true")
//   res.cookie("newUser", false)
//   res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//   res.status(200).json({ message: "You got the cookies" });
// })

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies
//   console.log(cookies)

//   res.json(cookies)
// });



