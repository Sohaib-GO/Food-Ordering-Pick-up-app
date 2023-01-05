const express = require("express");
const router = express.Router();
const adminQueries = require("../db/queries/admin");

router.get("/", (req, res) => {
  return res.render("admin");
});


router.get("/orders", (req, res) => {
  res.render("orders");
});



module.exports = router;