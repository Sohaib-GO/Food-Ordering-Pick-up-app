const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// router.get("/", async (req, res) => {
//   const userId = req.session.user_id;

//   if (!userId) {
//     // User is not logged in, render homepage with "Guest" as the username
//     const templateVars = { username: "Guest" };
//     return res.render("account", templateVars);
//   }

//   const user = await userQueries.getUserById(userId);
//   const templateVars = { username: user.name };

//   return res.render("account", templateVars);
// });

router.get("/", async (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    return res.redirect("/");
  }
  try {
    // Delete expired confirmed orders
    await userQueries.deleteExpiredConfirmedOrders();

    const userId = req.session.user_id;
    const orders = await userQueries.getOrdersByUserId(userId);
    const templateVars = {
      orders: orders.map((order) => {
        // Convert the ready_at field to the user's local time
        order.ready_at = new Date(order.ready_at).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
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
