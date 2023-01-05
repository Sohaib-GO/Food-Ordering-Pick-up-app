require('dotenv');
const accountSid = process.env.ACace56e4e5f37db9bbc0900521773a3e5;
const authToken = process.env.d667f6a1f1aeeb898751081b887b08b3;
const client = require('twilio')(accountSid, authToken);
const express = require("express");
const router = express.Router();
const ordersDb = require('../db/queries/hard_order-db');
const orderNum = 'userRandomID'

const getOrderById = (orderNum, ordersDb) => {
    for (let id in ordersDb) {
        if (orderNum === ordersDb[id].order_id) {
            return true; 
        }
    }
};

router.post('/', (req, res) => {
    
    if (getOrderById) {
        for (let id in ordersDb) {
            let test = ordersDb[id].order_id;
            client.messages.create({  
                body: test,
                from: '+17154024150',
                to: '+16046003716' 
            })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));
        }
    }
    res.redirect('/homepage');
});


       


module.exports = router;