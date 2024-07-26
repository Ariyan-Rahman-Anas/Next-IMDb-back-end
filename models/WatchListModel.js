const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    original_title: {
      type: String,
    },
    overview: {
      type: String,
    },
    release_date: {
      type: String,
    },
    first_air_date: {
      type: String,
    },
    vote_count: {
      type: String,
    },
    poster_path: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const watchListModel = mongoose.model("watchList", watchListSchema)
module.exports = watchListModel;