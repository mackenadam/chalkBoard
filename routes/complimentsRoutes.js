const express = require('express')
const router = express.Router()
const funcs = require('./helperFuncs')

//SHOW ALL COMPLIMENTS
router.get('/', (req, res) => {
   funcs.getData(data => {
      res.render('compliments', {compliments: data.compliments})
   })
})

//POST NEW COMPLIMENT
router.post('/', (req, res) => {
   funcs.getData(data => {
      let newCompliment = {
         "comment": req.body.comment,
         "author": req.body.author,
         "id": data.compliments.length || 0
      }
      data.compliments.push(newCompliment)
      funcs.reWriteData(data, () => {
         res.redirect('/compliments')
      })
   })
})

//DELETE COMPLIMENT
router.get('/:id/delete', (req, res) => {
   funcs.getData(data => {
      const board = Object.keys(data)[0]
      const id = req.params.id
      const newData = funcs.removeComment(data, board, id)
      funcs.reWriteData(newData, () => {
         res.redirect('/compliments')
      })
   })
})

module.exports = router