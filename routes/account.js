const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");


router.get("/", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect("/");
  }
  try {
    // Delete expired confirmed orders
    await userQueries.deleteExpiredConfirmedOrders();

    const orders = await userQueries.getOrdersByUserId(userId);
    const templateVars = {
      orders: orders.map((order) => {
        // Convert the ready_at field to the user's local time
        order.ready_at = new Date(order.ready_at).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        // calculate the total price of the order + tax
        order.tax = (order.price * order.quantity * 0.05).toFixed(2);
        order.total = (
          order.price * order.quantity + parseFloat(order.tax)).toFixed(2);

        return order;
      }),
    };
    res.render("account", templateVars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
