const express = require("express")
const cors = require("cors");
const port = process.env.APP_PORT || 9001 ;
require("dotenv").config();
const dbConfig = require("./src/config/dbConfig");
dbConfig();

const authRoute = require("./routes/authRoute");

const app = express();

//basic middleware
app.use(express.json());
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