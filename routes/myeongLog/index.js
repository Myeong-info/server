const express = require('express');
const create = require('./create');
const { get, getAll } = require('./read');
const router = express.Router();

router.post('/', create);
router.get('/filter', getAll); //tag이름으로 블로그 전체조회
router.get('/:id', get); //블로그 상세보기



module.exports = router;
