const express = require('express');

const Message = require('../models/message');

const router = new express.Router();

router.get('/', (req, res) => Message.find({}, res.handle));

router.post('/', (req, res) =>
  Message.create(req.body, res.handle)
);

module.exports = router;
