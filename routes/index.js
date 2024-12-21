const express = require('express');
const myeongLogRouter = require('./myeongLog');
const router = express.Router();

router.use('/myeongLog', myeongLogRouter);

module.exports = router;
