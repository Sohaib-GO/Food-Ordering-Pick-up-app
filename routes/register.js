const cookieSession = require('cookie-session');
const express = require('express');
const router = express.Router();
const usersDb = require("../db/queries/hard-db");


router.use(cookieSession({
  name: 'session',
  keys: ['supersecretkey'],
}));

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


router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = genRandomString();

  if(!email || !password) {
    return res.send("Status Code 400 empty email or password box");
  }
 
  if (getUserByEmail(email, usersDb)) {
    return res.send("Error user already exists");
  }
  //phone, address, name
  //user object and db updated, account-type
  //display info in account if logged 
  //can view and update 
  usersDb[id] = {id, password, email}
  req.session.user_id = usersDb[id].id;
  return res.redirect('/homepage');
});

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  const templateVars = {username: userId}

  if (userId) {
    return res.redirect("/homepage")
  }
    return res.render('register', templateVars);
});


module.exports = router;