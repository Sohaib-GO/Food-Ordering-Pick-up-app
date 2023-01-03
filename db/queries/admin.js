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
const createMenuItem = async (foodName, foodDescription, price, foodCategory, imageUrl) => {
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
const updateMenuItem = async (id, foodName, foodDescription, price, foodCategory, imageUrl) => {
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
    const result = await db.query("DELETE FROM menus WHERE id = $1 RETURNING *", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };


