const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const addMenuOrder = async (userId, menuId, quantity, instruction, total) => {
  try {
    const result = await db.query(
      "INSERT INTO orders (user_id, menu_id, quantity, instruction, total) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, menuId, quantity, instruction, total]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUsers, addMenuOrder };
