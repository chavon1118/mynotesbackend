var express = require('express');
var NoteController = require('../../controllers/note.controller');

var router = express.Router();

router.get('/', NoteController.getNotes);

router.post('/', NoteController.createNote);

router.put('/', NoteController.updateNote);

router.delete('/:id', NoteController.removeNote);

module.exports = router;