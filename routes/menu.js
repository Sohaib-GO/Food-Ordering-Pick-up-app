const express = require('express');
const router = express.Router();
const usersDb = require("../db/queries/hard-db");


router.get('/', (req, res) => {
    const user_id = req.session.user_id;
    const username = usersDb[user_id];
    const templateVars = {username};

    return res.render('menu', templateVars);
  });

  
module.exports = router;