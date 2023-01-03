/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const cookieSession = require("cookie-session");
const express = require("express");
const router = express.Router();

router.use(cookieSession({
  name: 'session',
  keys: ['supersecretkey'],
}));


router.get('/', (req, res) => {
  return res.render('users');
});

module.exports = router;
