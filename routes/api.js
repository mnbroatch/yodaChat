const express = require('express');

const router = new express.Router();

router.use('/messages', require('./messages'));

module.exports = router;
