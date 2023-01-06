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

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = { username: userId };

  return res.render("login", templateVars);
});

router.post("/", async(req, res) => {
  const email = req.body.email;
  const user = await userQueries.getUserByEmail(email);
  
  if (user) {
    const password = req.body.password;
    if (password === user.password) {
      req.session.userId = user.id;
      return res.redirect("/");
    } else {
      return res.send("Error: incorrect password");
    }
  }
  return res.send("Error: user not found");
});

module.exports = router;
