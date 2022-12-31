//  this query is used to search for a menu item

const db = require("../connection");

const searchMenu = (search) => {
  const query = `SELECT * FROM menus WHERE food_name  ILIKE $1`;
  const values = [`%${search}%`];
  return db.query(query, values).then((data) => {
    return data.rows;
  });
};

module.exports = { searchMenu };
