const db = require("../connection");

const ordersDb = {
    
    userRandomID: {
      order_id: "1111",
      email: "user@example.com",
      time_order: "123",
      special_instructions: 'none',
      order_total: '123',
    },
  
    user2RandomID: {
      id: "user2RandomID",
      email: "user2@example.com",
      password: "321",
      name: 'test',
      phone_number: '321',
    }
  };

  module.exports = ordersDb;