require("dotenv");
const accountSid = process.env.ACace56e4e5f37db9bbc0900521773a3e5;
const authToken = process.env.d667f6a1f1aeeb898751081b887b08b3;
const client = require("twilio")(accountSid, authToken);

const express = require("express");
const router = express.Router();
const adminQueries = require("../db/queries/admin");


// Read all menu items
router.get("/", (req, res) => {
  adminQueries
    .getAllMenuItems()
    .then((menuItems) => {
      res.json({ menuItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create a new menu item
router.post("/", (req, res) => {
  adminQueries
    .createMenuItem(
      req.body.food_name,
      req.body.food_description,
      req.body.price,
      req.body.food_category,
      req.body.image_url
    )
    .then((newMenuItem) => {
      res.json({ newMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// Update a single menu item
router.put("/:id", (req, res) => {
  adminQueries
    .updateMenuItem(
      req.params.id,
      req.body.food_name,
      req.body.food_description,
      req.body.price,
      req.body.food_category,
      req.body.image_url
    )
    .then((updatedMenuItem) => {
      if (!updatedMenuItem) {
        res.sendStatus(404);
        
        return;
      }
      res.json({ updatedMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a single menu item
router.delete("/:id", (req, res) => {
  adminQueries
    .deleteMenuItem(req.params.id)
    .then((deletedMenuItem) => {
      if (!deletedMenuItem) {
        res.sendStatus(404);
        return;
      }
      res.json({ deletedMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});



router.get("/orders", async (req, res) => {
  try {
    const orders = await adminQueries.getPendingOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// confirm order

router.post("/orders/confirm", async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const waitTime = req.body.waitTime;
    const readyAt = new Date(Date.now() + waitTime * 60000); // convert wait time from minutes to milliseconds

    await adminQueries.updateOrder(orderId, "confirmed", readyAt);

    const phoneNumber = await adminQueries.getPhoneNumberByOrderID(orderId);

    client.messages
      .create({
        body: `Your order #${orderId} has been confirmed! It will be ready at ${readyAt.toLocaleTimeString()} `,
        from: "+17154024150", // your Twilio phone number
        to: phoneNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));

    // Update the order status in the database
    await adminQueries.updateOrder(orderId, "confirmed", readyAt);

    res.json({ message: "Successfully confirmed order." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error confirming order." });
  }
});

 










module.exports = router;
