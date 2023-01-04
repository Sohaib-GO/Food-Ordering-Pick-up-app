const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

router.get("/", async (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
  // User is not logged in, render homepage with "Guest" as the username
  const templateVars = {username: userId};
  return res.render("homepage", templateVars);
  }

  const user = await userQueries.getUserById(userId);
  const templateVars = { username: user.name };

  return res.render("homepage", templateVars);

  // User is logged in, fetch their name from the database
  
});

module.exports = router;
