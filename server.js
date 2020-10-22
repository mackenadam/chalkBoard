const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')

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
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const viewInfo = {
      compliments: data.compliments
    }
    console.log(viewInfo)
    res.render('compliments', viewInfo)
 })
})

server.get('/advice', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
      data = JSON.parse(data)
      const viewInfo = {
        advice: data.advice
      }
      console.log(viewInfo)
      res.render('advice', viewInfo)
   })
})

server.get('/vent', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const viewInfo = {
      vent: data.vent
    }
    console.log(viewInfo)
    res.render('vent', viewInfo)
 })
})



module.exports = server
