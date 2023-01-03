/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const cookieSession = require("cookie-session");
const express = require("express");
const router = express.Router();

router.use(
  cookieSession({
    name: "session",
    keys: ["supersecretkey"],
  })
);

// CHECKS FOR EMAIL IN USER DATABASE & RETURNS USER MATCHING OBJ
const getUserByEmail = (email, database) => {
  for (let id in database) {
    if (email === database[id].email) {
      return database[id];
    }
  }
  return null;
};

const genRandomString = () => {
  return (Math.random() + 1).toString(36).substring(6);
};


// USER DATABSAE
const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "123",
  },

  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "321",
  },
};







router.get('/', (req, res) => {
  return res.render('users');
});



router.get("/homepage", (req, res) => {
  const user_id = req.session.user_id;

  const username = users[user_id];

  const templateVars = {
    username,
  };

  return res.render("homepage", templateVars);
});

router.get("/menu", (req, res) => {
  return res.render("menu");
});

router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = genRandomString();

  if (!email || !password) {
    return res.send("Status Code 400 empty email or password box");
  }

  if (getUserByEmail(email, users)) {
    return res.send("Error user already exists");
  }

  users[id] = { id, password, email };
  req.session.user_id = users[id].id;
  return res.redirect("/users/homepage");
});

router.get("/register", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = { username: userId };

  if (userId) {
    return res.redirect("/users/homepage");
  }
  return res.render("register", templateVars);
});

// LOGIN POST ROUTE
router.get("/login", (req, res) => {
  const userId = req.session.user_id;
  const templateVars = { username: userId };

  return res.render("login", templateVars);
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const user = getUserByEmail(email, users);

  if (user) {
    const password = req.body.password;
    req.session.user_id = user.id;
    return res.redirect("/users/homepage");
  }
  return res.send("error account does not exist");
});

router.post("/logout", (req, res) => {
  req.session = null;
  console.log("line 63");
  return res.redirect("/users/homepage");
});

module.exports = router;
