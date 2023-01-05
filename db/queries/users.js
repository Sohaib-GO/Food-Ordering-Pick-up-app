const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const addMenuOrder = async (
  userId,
  menuId,
  quantity,
  instruction,
  price,
  timeOrdered,
  orderStatus,
  readyAt
) => {
  try {
    const result = await db.query(
      "INSERT INTO orders (user_id, menu_id, quantity, special_instructions, price, time_ordered, order_status, ready_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        userId,
        menuId,
        quantity,
        instruction,
        price,
        timeOrdered,
        orderStatus,
        readyAt,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// add new user to database
const addUser = async (
  name,
  email,
  password,
  phoneNumber,
  address,
  accountType
) => {
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password, phone_number,address, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, password, phoneNumber, address, accountType]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get user by email
const getUserByEmail = async (email) => {
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
