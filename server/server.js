// Importing the express package
const express = require('express')
const bodyParser = require('body-parser')
const { getConnection } = require('./mssql.js')

// Initializing express
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Specify the port
const port = 3000

app.post('/api/products', async (req, res) => {
  const pool = await getConnection()
  const request = pool.request()
  const sqlQuery = `INSERT INTO Products (name, price) VALUES ('${req.body.name}', ${req.body.price})`;
  request.query(sqlQuery, (err) => {
    if (err) {
      console.log('Error writing to the database: ', err)
      res.status(500).send(err)
    }
    else {
      res.status(200).send('Data written successfully!')
    }
  })
})

app.get('/api/products', async (req, res) => {
  const pool = await getConnection()
  const request = pool.request()
  request.query('SELECT * FROM Products', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result.recordset);
    }
  });
})

app.put('/api/products/:id', async (req, res) => {
  const pool = await getConnection()
  const request = pool.request()
  const sqlQuery = `UPDATE Products SET name = '${req.body.name}', price = ${req.body.price} WHERE id = ${req.params.id}`;

  request.query(sqlQuery, (err) => {
    if (err) {
      console.log('Error updating the database:', err)
      res.status(500).send(err)
    }
    else {
      res.status(200).send(`Record with the id ${req.params.id} updated successfully`)
    }
  })
})

app.delete('/api/products/:id', async (req, res) => {
  const pool = await getConnection()
  const request = pool.request()
  const sqlQuery = `DELETE FROM Products WHERE id = ${req.params.id}`;

  request.query(sqlQuery, (err) => {
    if (err) {
      console.log('Error deleting from the database:', err)
      res.status(500).send(err)
    }
    else {
      res.status(200).send(`Record with the id ${req.params.id} deleted successfully`)
    }
  })
})

// Starting the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
