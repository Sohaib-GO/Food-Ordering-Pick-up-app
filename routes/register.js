const express = require('express');
const router = express.Router();

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

router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = genRandomString();

  if(!email || !password) {
    return res.send("Status Code 400 empty email or password box");
  }
 
  if (getUserByEmail(email, users)) {
    return res.send("Error user already exists");
  }
  
  users[id] = {id, password, email}
  req.session.user_id = users[id].id;
  return res.redirect('/users/homepage');
});

router.get('/register', (req, res) => {
  const userId = req.session.user_id;
  const templateVars = {username: userId}

  if (userId) {
    return res.redirect("/users/homepage")
  }
    return res.render('register', templateVars);
});

module.exports = router;