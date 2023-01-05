DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  menu_id INTEGER REFERENCES menus(id),
  quantity SMALLINT NOT NULL,
  time_ordered TIMESTAMP NOT NULL,
  special_instructions VARCHAR(255)  DEFAULT 'none',
  price NUMERIC (10, 0) NOT NULL,
  order_status VARCHAR(255) NOT NULL DEFAULT 'pending',
  ready_at TIMESTAMP 
);