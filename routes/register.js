const cookieSession = require("cookie-session");
const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

router.use(
  cookieSession({
    name: "session",
    keys: ["supersecretkey"],
  })
);

router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;

  if (!name || !email || !password || !phoneNumber || !address) {
    return res.status(400).send("Missing required fields");
  }
  try {
    const user = await userQueries.getUserByEmail(email);
    if (user) {
      return res.status(400).send("User already exists");
    }
    const newUser = await userQueries.addUser(
      name,
      email,
      password,
      phoneNumber,
      
      address
    );
    req.session.userId = newUser.id;
    return res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = { username: userId };

  if (userId) {
    return res.redirect("/homepage");
  }
  return res.render("register", templateVars);
});

module.exports = router;
