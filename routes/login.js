const cookieSession = require('cookie-session');
const express = require('express');
const router = express.Router();
const usersDb = require("../db/queries/hard-db");

router.use(cookieSession({
    name: 'session',
    keys: ['supersecretkey'],
  }));

const getUserByEmail = (email, database) => {
    for (let id in database) {
        console.log(database[id])
      if (email === database[id].email) {
        return database[id];
      }
    }
    return null;
  };

router.get('/', (req, res) => {
    const userId = req.session.user_id;
    const templateVars = {username: userId}
  
    return res.render('login', templateVars);
  });
  
  
  router.post('/', (req, res) => {
    const email = req.body.email;
    const user = getUserByEmail(email, usersDb);
  
    if (user) {
      const password = req.body.password;
      req.session.user_id = user.id;
      return res.redirect('/homepage');
    }
    return res.send("error account does not exist");
  });
  

  module.exports = router;