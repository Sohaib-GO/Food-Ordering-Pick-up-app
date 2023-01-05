const db = require("../connection");



const registerUser = (inputs) => {
    const query = `INSERT INTO users (name, email, password, phone_number, account_type)`
    VALUES  = [`${inputs.name}`, `${inputs.email}`, `${inputs.password}`, `${phone_number}` `${inputs.account_type}`];
    return db.query(query, values).then((data) => {
      return data.rows;
    });
  };