const express = require('express');
const router = express.Router();
const fse = require('fs-extra');
const path = require("path");

router.get('/', function(req, res, next) {
  const list = fse.readJsonSync(path.resolve(__dirname, '../data/md/list.json'));
  res.send(list);
});

module.exports = router;
