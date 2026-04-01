var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("SITE IS WORKING");
});

module.exports = router;
