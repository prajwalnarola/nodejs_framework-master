require("dotenv").config();
// ALL DATBASE INFORMATION STORED IN THE .env FILE FOR SECURITY PURPOSE.
module.exports = {
  HOST: process.env.DB_HOST, // name of the host
  USER: process.env.DB_USER, // database username
  password: process.env.DB_PASSWORD ?? "", // passowrd of the database access
  DB: process.env.DB_NAME, // name of the database
  dialect: "mysql", // database type. // Replace 'mysql' with the desired SQL dialect (e.g., 'postgres', 'sqlite', 'mssql', etc.)
  pool: {
    max: 5, // maximum number of connections permissible in a pool
    min: 0, // minimum number of connections permissible in a pool
    acquire: 30000, // maximum time, in terms of milliseconds, that the pool seeks to make the connection before an error message pops up on screen
    idle: 10000, // maximum time, in terms of milliseconds, that a connection can be held idly before being released
  },
};
