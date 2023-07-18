const express = require('express');
const router = express.Router();
const fse = require('fs-extra');
const path = require("path");
const resFormat = require('./response/resFormat');

router.get('/', function(req, res) {
  const list = fse.readJsonSync(path.resolve(__dirname, '../data/md/list.json'));
  res.send(resFormat(1000, list));
});

module.exports = router;
