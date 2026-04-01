var express = require("express");
var router = express.Router();

/* GET songs page */
router.get("/", function (req, res) {
  res.send("Songs route is running (Mongo disabled)");
});

/* CREATE (disabled) */
router.post("/", function (req, res) {
  res.send("POST disabled (no database connected)");
});

/* UPDATE (disabled) */
router.put("/", function (req, res) {
  res.send("PUT disabled (no database connected)");
});

/* DELETE (disabled) */
router.delete("/:id", function (req, res) {
  res.send("DELETE disabled (no database connected)");
});

module.exports = router;
