const db = require("../connection");

// Read all menu items
const getAllMenuItems = async () => {
  try {
    const result = await db.query("SELECT * FROM menus");
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new menu item
const createMenuItem = async (
  foodName,
  foodDescription,
  price,
  foodCategory,
  imageUrl
) => {
  try {
    const result = await db.query(
      "INSERT INTO menus (food_name, food_description, price, food_category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [foodName, foodDescription, price, foodCategory, imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update a single menu item
const updateMenuItem = async (
  id,
  foodName,
  foodDescription,
  price,
  foodCategory,
  imageUrl
) => {
  try {
    const result = await db.query(
      "UPDATE menus SET food_name = $1, food_description = $2, price = $3, food_category = $4, image_url = $5 WHERE id = $6 RETURNING *",
      [foodName, foodDescription, price, foodCategory, imageUrl, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a single menu item
const deleteMenuItem = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM menus WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Returns a promise that resolves to an object where the keys are user IDs and the values are arrays of orders made by that user
const fetchOrdersByUserId = async (userId) => {
  const res = await db.query(`SELECT * FROM orders WHERE user_id = $1`, [
    userId,
  ]);
  const orders = {};
  for (const order of res.rows) {
    if (!orders[order.user_id]) {
      orders[order.user_id] = [];
    }
    orders[order.user_id].push(order);
  }
  return orders;
};


const updateOrder = async (orderId, orderStatus, readyAt) => {
  try {
    await db.query(
      "UPDATE orders SET order_status = $1, ready_at = $2 WHERE id = $3",
      [orderStatus, readyAt, orderId]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get pending orders
const getPendingOrders = async () => {
  try {
    const result = await db.query(`
      SELECT orders.*,  menus.food_name as food_name, menus.price
      FROM orders
      JOIN menus ON menus.id = orders.menu_id
      WHERE order_status = 'pending'
      GROUP BY orders.id, menus.food_name, menus.price
    `);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// get confirmed orders
const getConfirmedOrders = async () => {
  try {
    const orders = await db.query(
      "SELECT * FROM orders WHERE order_status = 'confirmed'"
    );
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPhoneNumberByOrderID = async (orderId) => {
  const res = await db.query(
    `SELECT phone_number FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.id = $1`,
    [orderId]
  );
  return res.rows[0];
};



module.exports = {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  fetchOrdersByUserId,
  getPhoneNumberByOrderID,
  getPendingOrders,
  getConfirmedOrders,
  updateOrder,};
