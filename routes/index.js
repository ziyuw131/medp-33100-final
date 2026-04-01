var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    // TEMP FIX: no MongoDB (prevents Render crash)

    const posts = [];

    res.render("index", {
      title: "Memoirs of a Melody",
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
