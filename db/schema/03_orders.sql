DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  menu_id INTEGER REFERENCES menus(id),
  quantity SMALLINT NOT NULL,
  time_ordered TIMESTAMP NOT NULL,
  special_instructions VARCHAR(255) NOT NULL,
  order_total DECIMAL(10,2) NOT NULL,
  order_status VARCHAR(255) NOT NULL,
  ready_at TIMESTAMP NOT NULL
);