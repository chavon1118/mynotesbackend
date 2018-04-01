var express = require('express');
var notes = require('./api/note.route');

var router = express.Router();

router.use('/notes', notes);

module.exports = router;