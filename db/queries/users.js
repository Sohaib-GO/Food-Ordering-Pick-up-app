const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const addMenuOrder = async(userId, menuId, quantity, instruction, total) => {
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

// add new user to database
const addUser = async(name, email, password, phoneNumber, accountType) => {
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password, phone_number, account_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, phoneNumber, accountType]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get user by id
const getUserById = async(id) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get user by email
const getUserByEmail = async(email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getUsers,
  addMenuOrder,
  addUser,
  getUserById,
  getUserByEmail,
};
