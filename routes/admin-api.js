const express = require("express");
const router = express.Router();
const menuQueries = require("../db/queries/admin");



// Read all menu items
router.get("/", (req, res) => {
  menuQueries
    .getAllMenuItems()
    .then((menuItems) => {
      res.json({ menuItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create a new menu item
router.post("/", (req, res) => {
  menuQueries
    .createMenuItem(
      req.body.food_name,
      req.body.food_description,
      req.body.price,
      req.body.food_category,
      req.body.image_url
    )
    .then((newMenuItem) => {
      res.json({ newMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Read a single menu item
router.get("/:id", (req, res) => {
  menuQueries
    .getMenuItemById(req.params.id)
    .then((menuItem) => {
      if (!menuItem) {
        res.sendStatus(404);
        return;
      }
      res.json({ menuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a single menu item
router.put("/:id", (req, res) => {
  menuQueries
    .updateMenuItem(
      req.params.id,
      req.body.food_name,
      req.body.food_description,
      req.body.price,
      req.body.food_category,
      req.body.image_url
    )
    .then((updatedMenuItem) => {
      if (!updatedMenuItem) {
        res.sendStatus(404);
        
        return;
      }
      res.json({ updatedMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a single menu item
router.delete("/:id", (req, res) => {
  menuQueries
    .deleteMenuItem(req.params.id)
    .then((deletedMenuItem) => {
      if (!deletedMenuItem) {
        res.sendStatus(404);
        return;
      }
      res.json({ deletedMenuItem });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
