const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const router = require("./api/route");
const pool = require("./api/dbConf");
const query = require("./api/queries");

//test db connection
pool
  .getConnection()
  .then(async (connection) => {
    try {
      await Promise.all([
        connection.query(query.createCustomersTable),
        connection.query(query.createProductsTable),
        connection.query(query.createSalesTable),
        connection.query(query.createUsersTable),
      ]);
      console.log("Successfully connected to MySQL Database");
    } catch (error) {
      console.error("Error creating tables:", error);
    } finally {
      connection.release();
    }
  })
  .catch((error) => {
    console.error("Error connecting to MySQL Database:", error);
  });

//custom route
app.use("/api/v1/mp-3", router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening in port: ${process.env.PORT}`);
});
