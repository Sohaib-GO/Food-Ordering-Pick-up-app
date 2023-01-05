DROP TABLE IF EXISTS ordered_items
CASCADE;

CREATE TABLE ordered_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  quantity SMALLINT DEFAULT 1, 
  delivery_status VARCHAR(255)  DEFAULT 'preparing'
  
);