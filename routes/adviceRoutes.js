const express = require('express')
const router = express.Router()
const funcs = require('./helperFuncs')

//SHOW ALL ADVICE
router.get('/', (req, res) => {
   funcs.getData(data => {
      const viewData = {
         advice: data.advice,
         board: Object.keys(data)[1]
      }
      res.render('advice', viewData)
   })
})

//POST NEW ADVICE
router.post('/', (req, res) => {
   funcs.getData(data => {
      let newAdvice = {
         "comment": req.body.comment,
         "author": req.body.author,
         "id": data.advice.length || 0
      }
      data.advice.push(newAdvice)
      
      funcs.reWriteData(data, () => {
         res.redirect('/advice')
      })
   })
})

//DELETE ADVICE
router.get('/:id/delete', (req, res) => {
   funcs.getData(data => {
      const board = Object.keys(data)[1]
      const id = req.params.id
      const newData = funcs.removeComment(data, board, id)
      
      funcs.reWriteData(newData, () => {
         res.redirect('/advice')
      })
   })
})

module.exports = router