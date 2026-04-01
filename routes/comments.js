var express = require("express");
var router = express.Router();

/* GET comments */
router.get("/", function (req, res) {
  res.send("Comments route is running (Mongo disabled)");
});

/* POST comment (disabled) */
router.post("/", function (req, res) {
  res.send("POST comments disabled (no database connected)");
});

module.exports = router;
