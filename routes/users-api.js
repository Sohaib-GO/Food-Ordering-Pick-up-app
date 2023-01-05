/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const menuQueries = require("../db/queries/search_menu");
router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/search", (req, res) => {
  // search menu items by name
  menuQueries
    .searchMenu(req.query.search)
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/orders/add", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const menuId = req.body.menuId;
    const quantity = req.body.quantity;
    const instruction = req.body.instruction;
    const price = req.body.price;
    const timeOrdered = new Date();
    const orderStatus = req.body.orderStatus;
    const readyAt = null;

    const newOrder = await userQueries.addMenuOrder(
      userId,
      menuId,
      quantity,
      instruction,
      price,
      timeOrdered,
      orderStatus,
      readyAt
    );
    res.json({
      message: "Successfully added menu to order.",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding menu to order." });
  }
});



module.exports = router;
