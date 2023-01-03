const express = require('express');
const router = express.Router();
const usersDb = require("../db/queries/hard-db");

router.get('/', (req, res) => {
    const user_id = req.session.user_id;
    const username = usersDb[user_id];
    const templateVars = {username, usersDb, user_id};
    
    if(!username) {
        res.redirect('/homepage');
    }
    
    return res.render('account', templateVars);
});

module.exports = router;