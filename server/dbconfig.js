require('dotenv').config()

module.exports = {
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  server: process.env.SERVER_NAME,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: true, // use this for Azure SQL Database
    enableArithAbort: true
  }
}