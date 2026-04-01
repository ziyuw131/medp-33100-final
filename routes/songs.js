var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("Songs route is working");
});

router.post("/", function (req, res) {
  res.send("POST songs received (safe mode)");
});

router.put("/", function (req, res) {
  res.send("PUT songs received (safe mode)");
});

router.delete("/:id", function (req, res) {
  res.send("DELETE songs received (safe mode)");
});

module.exports = router;
