const express = require("express");
const router = express.Router();
const TvController = require("../controllers");

router.get("/", TvController.getTv);
router.get("/:id", TvController.getTvById);
router.post("/", TvController.addTv);
router.patch("/:id", TvController.updateTv);
router.delete("/all", TvController.flushAllTv);
router.delete("/bulk", TvController.bulkDeleteTv);
router.delete("/:id", TvController.deleteTv);

module.exports = router;
