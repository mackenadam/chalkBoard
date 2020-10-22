const express = require('express')
const hbs = require('express-handlebars')

const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

//routes
server.get('/', (req, res) => {
  res.render('index')
})

server.get('/compliments', (req, res) => {
  res.render('compliments')
})

server.get('/advice', (req, res) => {
  res.render('advice')
})

server.get('/vent', (req, res) => {
  res.render('vent')
})

module.exports = server
