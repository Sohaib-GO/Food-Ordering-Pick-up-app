
const express = require("express");
const router = express.Router();
const adminQueries = require("../db/queries/admin");

router.get("/", (req, res) => {
  return res.render("admin");
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await adminQueries.getPendingOrders();
    console.log(orders);
    res.render("orders", { orders: orders }); // pass orders as an object to the template
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
