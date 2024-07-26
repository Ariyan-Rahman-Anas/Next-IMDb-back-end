const { Router } = require("express");
const router = Router();
const watchListController = require("./../controller/watchListController");
const { requireAuth } = require("../src/middleware/authMiddleware");

router.get("/watch-list", requireAuth, watchListController.watchList_get);
router.post("/watch-list", watchListController.watchList_post);

module.exports = router;