const express = require("express");
const router = express.Router();
const ModelController = require("../controllers");

/* GET users listing. */
router.get("/", ModelController.getMovies);
router.get("/:id", ModelController.getMovieById);
router.post("/", ModelController.addMovie);
router.patch("/:id", ModelController.updateMovie);
router.delete("/all", ModelController.flushAll);
router.delete("/bulk", ModelController.bulkDelete);
router.delete("/:id", ModelController.deleteMovie);

module.exports = router;
