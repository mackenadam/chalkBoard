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


//form post routes
server.post('/compliments', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
  let newCompliment = {
    "comment" : req.body.comment,
    "author" : req.body.author
  }
  data.compliments.push(newCompliment)

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) throw err
    res.redirect('/compliments')
    })
  })
})

server.post('/advice', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
  let newAdvice = {
    "comment" : req.body.comment,
    "author" : req.body.author
  }
  data.advice.push(newAdvice)

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) throw err
    res.redirect('/advice')
    })
  })
})

server.post('/vent', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)



  let newVent = {
    "comment" : req.body.comment,
    "author" : req.body.author,
    "id": data.vent.length.toString() || '0'
  }
  data.vent.push(newVent)

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) throw err
    res.redirect('/vent')
    })
  })
})

//view get routes




server.get('/advice', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
      data = JSON.parse(data)
      const viewInfo = {
        advice: data.advice
      }
      res.render('advice', viewInfo)
   })
})


server.get('/vent', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const viewInfo = {
      vent: data.vent
    }
    res.render('vent', viewInfo)
 })
})

server.get('/compliments', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const viewInfo = {
      compliments: data.compliments
    }
    res.render('compliments', viewInfo)
 })
})


//edit comment routes
server.get('/:board/edit/:id', (req, res) => {
  

  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const viewInfo = {
      thisComment: data[req.params.board][req.params.id],
      thisBoard: req.params.board,
      id: req.params.id
    }
    res.render('editComment', viewInfo)
 })
})

server.post('/:board/edit/:id', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
 
  data[req.params.board][req.params.id].comment = req.body.comment
  data[req.params.board][req.params.id].author = req.body.author

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) throw err
    res.redirect('/' + req.params.board)
    })
  })
})

// server.get('/advice/edit/:id', (req, res) => {
  

//   fs.readFile('data.json', 'utf-8', (err, data) => {
//     data = JSON.parse(data)
//     const viewInfo = {
//       thisComment: data.advice[req.params.id]
//     }
//     res.render('editComment', viewInfo)
//  })
// })

// server.get('/vent/edit/:id', (req, res) => {
  

//   fs.readFile('data.json', 'utf-8', (err, data) => {
//     data = JSON.parse(data)
//     const viewInfo = {
//       thisComment: data.vent[req.params.id]
//     }
//     res.render('editComment', viewInfo)
//  })
// })


module.exports = server
