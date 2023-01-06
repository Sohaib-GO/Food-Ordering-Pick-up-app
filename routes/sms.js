require("dotenv");
const accountSid = process.env.ACace56e4e5f37db9bbc0900521773a3e5;
const authToken = process.env.d667f6a1f1aeeb898751081b887b08b3;
const client = require("twilio")(accountSid, authToken);
const express = require("express");
const router = express.Router();
const usersQueries = require("../db/queries/users");

router.post("/", async (req, res) => {
  try {
    // Fetch the order from the database
    const userId = req.session.userId;
    console.log(userId);
    const orders = await usersQueries.getOrdersByUserId(userId);
    // Send the text message using the order information
    console.log(await usersQueries.getOrdersByUserId(userId));
    let messageBody = "";
    for (const order of orders) {
      messageBody += `A order has been placed : #${order.id}: ${order.food_name}\n`;
    }
    console.log(messageBody);

    client.messages
      .create({
        body: messageBody,
        from: "+17154024150",
        to: "+17802711491",
      })

      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));

    // Set the success message in the session and redirect to the homepage
    req.session.successMessage = "Order has been placed and text message sent!";
    res.redirect("/account");
  } catch (error) {
    console.error(error);

    // Set the error message in the session and redirect to the homepage
    req.session.errorMessage = "Error placing order";
    res.redirect("/homepage");
  }
});


module.exports = router;
