// CONTACT GET ROUTE
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    const user_id = req.session.user_id;
    const username = usersDb[user_id];
    const templateVars = {username};
    
    return res.render('contact', templateVars);
  });

  module.exports = router;