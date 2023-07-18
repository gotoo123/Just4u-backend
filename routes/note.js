const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const resFormat = require('./response/resFormat');

router.get('/:id', function(req, res) {
  const name = req.params.id;
  const mdPath = path.resolve(__dirname, '../data/md/articles');
  const fileName = fs.readdirSync(mdPath).find(item =>`${name}.md` === item);

  if(fileName) {
    const note = fs.readFileSync(path.resolve(mdPath, fileName), {encoding: 'utf8'});
    res.send(resFormat(1000, note));
  } else {
    res.send(resFormat(1001, null, 'file not exists!'));
  }
})

module.exports = router;
