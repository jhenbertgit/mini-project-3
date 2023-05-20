const createCustomersTable =
  "CREATE TABLE IF NOT EXISTS customers(customer_id INT PRIMARY KEY AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), address VARCHAR(150), city VARCHAR(50), zip VARCHAR(50), email VARCHAR(50), phone VARCHAR(15)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

const createProductsTable =
  "CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(6), description VARCHAR(255), unit_price VARCHAR(15)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

const createSalesTable =
  "CREATE TABLE IF NOT EXISTS sales(sale_id INT PRIMARY KEY AUTO_INCREMENT, customer_name VARCHAR(15), date_of_sale DATETIME) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

const createUsersTable =
  "CREATE TABLE IF NOT EXISTS users(user_id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(10) NOT NULL, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL, email_add VARCHAR(50) NOT NULL, password CHAR(60) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

//customers
const selectAllCustomers = "SELECT * FROM customers";
const selectCustomersById = "SELECT * FROM customers WHERE customer_id=?";
const insertCustomers =
  "INSERT INTO customers (firstname,lastname,address,city,zip,email,phone) VALUES (?,?,?,?,?,?,?)";
const updateCustomers =
  "UPDATE customers SET firstname=?,lastname=?,address=?,city=?,zip=?,email=?,phone=? WHERE customer_id=?";
const removeCustomers = "DELETE FROM customers WHERE customer_id=?";

//products
const selectAllProducts = "SELECT * FROM products";
const selectProductsById = "SELECT * FROM products WHERE product_id=?";
const insertProducts =
  "INSERT INTO products (code, description, unit_price) VALUES (?,?,?)";
const updateProducts =
  "UPDATE products SET code=?, description=?, unit_price=? WHERE product_id=?";
const removeProducts = "DELETE FROM products WHERE product_id=?";

//sales
const selectAllSales = "SELECT * FROM sales";
const selectSalesById = "SELECT * FROM sales WHERE sale_id=? ";
const insertSales =
  "INSERT INTO sales (customer_name, date_of_sale) VALUES(?,?)";
const updateSales =
  "UPDATE sales SET customer_name=?, date_of_sale=? WHERE sale_id=?";
const removeSales = "DELETE FROM sales WHERE sale_id=?";

//users
const selectAllUsers = "SELECT * FROM users";
const insertUsers =
  "INSERT INTO users (username, firstname, lastname, email_add, password) VALUES(?,?,?,?,?)";

module.exports = {
  selectAllCustomers,
  selectCustomersById,
  insertCustomers,
  updateCustomers,
  removeCustomers,
  selectAllProducts,
  selectProductsById,
  insertProducts,
  updateProducts,
  removeProducts,
  selectAllSales,
  selectSalesById,
  insertSales,
  updateSales,
  removeSales,
  selectAllUsers,
  insertUsers,
  createCustomersTable,
  createProductsTable,
  createSalesTable,
  createUsersTable,
};
