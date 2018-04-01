var NoteService = require('../services/note.service');

_this = this;

exports.getNotes = async function(req, res, next) {
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 10;

	try {
		var notes = await NoteService.getNotes({}, page, limit);

		return res.status(200).json({status: 200, data: notes, message: "Successfully Received Notes"});		
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
};

exports.createNote = async function(req, res, next) {
	var note = {
		title: req.body.title,
		content: req.body.content
	};

	try {
		var createdNote = await NoteService.createNote(note);

		return res.status(201).json({status: 201, data: createdNote, message: "Successfully Created Note"});
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
};

exports.updateNote = async function(req, res, next) {
	if (!req.body._id) {
		return res.status(400).json({status: 400, message: "Requires ID for update"});
	}

	var id = req.body._id;

	console.log("req body: ", req.body);

	var note = {
		id: id,
		title: req.body.title ? req.body.title : null,
		content: req.body.content? req.body.content : null
	};

	try {
		var updatedNote = await NoteService.updateNote(note);

		return res.status(200).json({status: 200, data: updatedNote, message: "Successfully Updated Note"});
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
};

exports.removeNote = async function(req, res, next) {
	var id = req.params.id;

	try {
		var result = await NoteService.deleteNote(id);

		return res.status(204).json({status: 204, message: "Successfully Deleted Note"});
	} catch (e) {
		return res.status(400).json({status: 400, message: e.message});
	}
}