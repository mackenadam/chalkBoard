const express = require('express')
const router = express.Router()
const funcs = require('./helperFuncs')

//SHOW ALL VENTS
router.get('/', (req, res) => {
   funcs.getData(data => {
      res.render('vent', {vent: data.vent})
   })
})

//POST NEW VENT
router.post('/', (req, res) => {
   funcs.getData(data => {
      const newVent = {
         "comment": req.body.comment,
         "author": req.body.author,
         "id": data.vent.length || 0
      }
      data.vent.push(newVent)
      funcs.reWriteData(data, () => {
         res.redirect('/vent')
      })
   })
})

//DELETE VENT
router.get('/:id/delete', (req, res) => {
   funcs.getData(data => {
      const board = Object.keys(data)[2]
      const id = req.params.id
      const newData = funcs.removeComment(data, board, id)
      funcs.reWriteData(newData, () => {
         res.redirect('/vent')
      })
   })
})

module.exports = router