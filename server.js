const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const complimentsRoutes = require('./routes/complimentsRoutes')
const adviceRoutes = require('./routes/adviceRoutes')
const ventRoutes = require('./routes/ventRoutes')
const editRoutes = require('./routes/editRoutes')

// MIDDLEWARE
server.engine('hbs', hbs({
   defaultLayout: 'main',
   extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

//ROUTES
server.get('/', (req, res) => res.render('index'))
server.use('/compliments', complimentsRoutes)
server.use('/advice', adviceRoutes)
server.use('/vent', ventRoutes)
server.use('/', editRoutes)

module.exports = server
