let poolPromise

const sql = require('mssql')
const config = require('./dbconfig')

sql.on('error', err => console.log(err))

function getConnection() {
  if (poolPromise) return poolPromise

  poolPromise = sql.connect(config).then(pool => {
    if (pool.connecting) {
      console.log('Connecting to the database...')
    }

    if (pool.connected) {
      console.log('Connected to the database.')
    }

    return pool;
  }).catch(err => console.log('Database Connection Failed - ', err))

  return poolPromise;
}

module.exports = {
  getConnection
}
