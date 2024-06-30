const mongoose = require("mongoose")

function dbConfig() {
    mongoose
      .connect(`${process.env.DB_URI}`)
      .then(() => console.log("MongoDB is connected!"))
      .catch((error) => console.log("MongoDB is connecting error is: ", error));
}
module.exports = dbConfig;