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
    1;
    throw error;
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const result = await db.query(
      `SELECT o.id, m.food_name , o.order_status, o.ready_at, o.price, o.quantity FROM orders o
       JOIN menus m ON m.id = o.menu_id
       WHERE o.user_id = $1 `,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteExpiredConfirmedOrders = async () => {
  try {
    const currentTime = new Date();
    const result = await db.query(
      `DELETE FROM orders WHERE order_status = 'confirmed' AND ready_at < $1`,
      [currentTime]
    );
    return result.rowCount;
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
  getOrdersByUserId,
  deleteExpiredConfirmedOrders,
  
};
