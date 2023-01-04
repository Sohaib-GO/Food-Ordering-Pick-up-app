const db = require("../connection");
//hard code database for testing

const usersDb = {
    userRandomID: {
      id: "userRandomID",
      email: "user@example.com",
      password: "123",
      name: 'test',
      phone_number: '123',
    },
  
    user2RandomID: {
      id: "user2RandomID",
      email: "user2@example.com",
      password: "321",
      name: 'test',
      phone_number: '321',
    }
  };

  module.exports = usersDb;