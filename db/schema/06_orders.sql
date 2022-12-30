DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  restaurant_id INTEGER REFERENCES restaurants(id),
  driver_id INTEGER REFERENCES drivers(id),
  quantity SMALLINT NOT NULL,
  time_ordered TIMESTAMP NOT NULL,
  driver_ETA TIME NOT NULL,
  restaurant_ETA TIME NOT NULL,
  user_request VARCHAR(255) NOT NULL,
  order_total DECIMAL(10,2) NOT NULL,
  delivered_time TIMESTAMP NOT NULL,
);