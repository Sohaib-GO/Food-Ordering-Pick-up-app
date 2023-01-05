require('dotenv');
const accountSid = process.env.ACace56e4e5f37db9bbc0900521773a3e5;
const authToken = process.env.c26ba9741aaf769fb2023ddb30195897;
const client = require('twilio')(accountSid, authToken);
const express = require("express");
const router = express.Router();

$(document).ready(function() {
    
    $("menu-checkout-btn").submit(function(event) {
        
        event.preventDefault();

        client.messages.create({  
                body: `test4321`,
                from: '+17154024150',
                to: '+16046003716'
            })
            .then(message => console.log(message.sid))
            .catch(err => console.log(err));
    })
});



module.exports = router;