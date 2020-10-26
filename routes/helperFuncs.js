const fs = require('fs')

function getData(next) {
   fs.readFile('data.json', 'utf-8', (err, data) => {
      if (err) {
         throw err
      } else {
         data = JSON.parse(data)
         next(data)
      }
   })
}

function reWriteData(data, next){
   fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
      if(err){
         throw err
      } else {
         next()
      }
   })
}

function removeComment(data, board, id){
   const newData = {...data}
   const found = newData[board].findIndex(element => element.id == id)
   newData[board].splice(found, 1)
   newData[board].forEach((element, index) => {
      element.id = index
   })
   return newData
}

function editComment(data, req){
   const newData = {...data}
   newData[req.params.board][req.params.id].comment = req.body.comment
   newData[req.params.board][req.params.id].author = req.body.author
   return newData
}

module.exports = {
   removeComment,
   getData,
   reWriteData,
   editComment
}
