const express = require('express')
const router = express.Router()
const funcs = require('./helperFuncs')

// SHOW EDIT FORM
router.get('/:board/edit/:id', (req, res) => {
   funcs.getData(data => {
      const viewInfo = {
         thisComment: data[req.params.board][req.params.id],
         thisBoard: req.params.board,
         id: req.params.id
      }
      res.render('editComment', viewInfo)
   })
})


// POST EDITED COMMENT
router.post('/:board/edit/:id', (req, res) => {
   funcs.getData(data => {
      const newComment = funcs.editComment(data, req)
      funcs.reWriteData(newComment, () => {
         res.redirect('/' + req.params.board)
      })
   })
})



module.exports = router