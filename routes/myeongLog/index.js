const express = require('express');
const create = require('./create');
const router = express.Router();

router.post('/', create);
router.get('/');

module.exports = router;
