const express = require('express');
const router = express.Router();
const usersDb = require("../db/queries/hard-db");

router.get('/', (req, res) => {
    return res.render('acccount');
});

module.exports = router;