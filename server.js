// You will need to create a .env file if not already completed that connects to your database.
// Configure Render with an Environment Variable key called DATABASE_URL; it should use your Internal Database URL from Render for the Value.
// That .env file should contain a line like:
// DATABASE_URL=postgres://postgres:postgres@localhost/postgres

// This line will tell server.js to use the .env file.
require('dotenv').config()

// To configure the pool, I used this:
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// I used port 3000 locally. You can change or update this as needed. I think you will want to add a port assignment for local testing. You might be using 6090. I suggest trying this:
const port = process.env.PORT || 6090

const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/')))

// Define routes here
app.get('/health', (req, res) => {
  res.status(200).send('healthy')
})

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/about', (req, res) => {
  res.render('pages/about')
})

app.get('/error', (req, res) => {
  res.render('pages/error')
})

// Start the server
app.listen(6090, () => {
  console.log('Server started on port 6090')
})

// Error handling
// Unspecified errors should be passed to error.ejs dynamically via the 'status' attribute.
// 404 error
app.use((req, res, next) => {
  res.status(404).render('pages/error', { status: 404 })
})
// 500 error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('pages/error', { status: 500 })
})
