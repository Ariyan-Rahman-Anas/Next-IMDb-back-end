const WatchListModel = require("./../models/WatchListModel")


//getting all
module.exports.watchList_get = async(req, res) => {
    try {
        const data = await WatchListModel.find()
        res.status(200).json({ totalData: data.length, data });
    } catch (error) {
        console.log("an error occurred to getting watch list data");
        res.status(500).json({ error: "Internal server error" });
    }
}

//posting an item
module.exports.watchList_post = async (req, res) => {
  const {
    backdrop_path,
    title,
    original_title,
    name,
    overview,
    release_date,
    first_air_date,
    vote_count,
    poster_path,
  } = req.body;
  try {
    const aMovie = await WatchListModel.create({
      backdrop_path,
      title,
      original_title,
      name,
      overview,
      release_date,
      first_air_date,
      vote_count,
      poster_path,
    });
    console.log("New data: ", aMovie);
    return res.status(201).json({
      message: "Posted data successfully!",
      data: aMovie,
    });
  } catch (error) {
    console.log("An error occurred while receiving new user data", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};