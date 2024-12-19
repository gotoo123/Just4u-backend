const express = require('express');
const router = express.Router();
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const resFormat = require('./response/resFormat');
const {getNowDate} = require('./utils');

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

router.post('/updateNote', function(req, res) {
  const { id, content } = req.body;
  const mdPath = path.resolve(__dirname, `../data/md/articles/${id}.md`);
  const fileExist = fs.existsSync(mdPath);

  if(fileExist) {
    fs.writeFileSync(mdPath, content);
    res.send(resFormat(1000, null));
  } else {
    res.send(resFormat(1001, null, 'file not exists!'));
  }
})

router.post('/createNote', function(req, res) {
  const { title, desc = '暂无描述' } = req.body;
  try {
    const mdPath = path.resolve(__dirname, `../data/md`);
    const listJsonPath = path.resolve(mdPath, './list.json');
    const listJson = fse.readJsonSync(listJsonPath);
    const newId = Math.max(...listJson.map(item => item.id)) + 1;
    // 将note信息存入list
    const info = {
      id: newId,
      title,
      desc,
      crtTime: getNowDate()
    }
    fse.writeJsonSync(listJsonPath, [...listJson, info])
    // 新建note文件
    const newPath = mdPath + `/articles/${newId}.md`;
    fs.writeFileSync(newPath, `##${title}`)
    res.send(resFormat(1000, null));
  } catch(e) {
    console.log(e)
    res.send(resFormat(1001, null, 'create error'));
  }
})

module.exports = router;
