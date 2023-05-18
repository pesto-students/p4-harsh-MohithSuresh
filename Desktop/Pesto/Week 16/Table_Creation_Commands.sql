-- CREATE DATABASE PESTO_ER;

USE PESTO_ER;

CREATE TABLE CITIES (
  city_id INT PRIMARY KEY,
  city_name VARCHAR(50) NOT NULL
);

-- SQL code for creating the WAREHOUSES table
CREATE TABLE WAREHOUSES (
  warehouse_id INT PRIMARY KEY,
  warehouse_name VARCHAR(50) NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (city_id) REFERENCES CITIES(city_id)
);

-- SQL code for creating the STORES table
CREATE TABLE STORES (
  store_id INT PRIMARY KEY,
  store_name VARCHAR(50) NOT NULL,
  warehouse_id INT NOT NULL,
  FOREIGN KEY (warehouse_id) REFERENCES WAREHOUSES(warehouse_id)
);

-- SQL code for creating the CUSTOMERS table
CREATE TABLE CUSTOMERS (
  customer_id INT PRIMARY KEY,
  customer_name VARCHAR(50) NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (city_id) REFERENCES CITIES(city_id)
);

-- SQL code for creating the ORDERS table
CREATE TABLE ORDERS (
  order_id INT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)
);

-- SQL code for creating the ITEMS table
CREATE TABLE ITEMS (
  item_id INT PRIMARY KEY,
  item_name VARCHAR(50) NOT NULL,
  item_weight FLOAT NOT NULL
);

-- SQL code for creating the ORDER_ITEMS table
CREATE TABLE ORDER_ITEMS (
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES ORDERS(order_id),
  FOREIGN KEY (item_id) REFERENCES ITEMS(item_id)
);