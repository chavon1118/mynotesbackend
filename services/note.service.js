var Note = require('../models/note.model');

_this = this;

// Async function to get the notes

exports.getNotes = async function(query, page, limit) {
	var paginate_options = {
		page,
		limit
	};

	try {
		var notes = await Note.paginate(query, paginate_options);

		return notes;
	} catch (e) {
		throw Error(e.message);
	}
};

exports.createNote = async function(note) {
	var newNote = new Note({
		title: note.title,
		content: note.content
	});

	try {
		var savedNote = await newNote.save();

		return savedNote;
	} catch (e) {
		throw Error("Error while creating Note");
	}
};

exports.updateNote = async function(note) {
	var id = note.id;

	try {
		var oldNote = await Note.findById(id);
	} catch (e) {
		throw Error("Error occured while finding the Note");
	}

	if(!oldNote) {
		return false;
	}

	console.log("old note: ", oldNote);

	oldNote.title = note.title;
	oldNote.content = note.content;

	console.log("updated note: ", oldNote);

	try {
		var savedNote = await oldNote.save();
		return savedNote;
	} catch (e) {
		throw Error("Error occured while updating the Note");
	}
};

exports.deleteNote = async function(id){
    try {
        var result = await Note.findOneAndRemove({_id: id});

        console.log(result);

        return result;
    }catch (e) {
        throw Error(e.message);
    }
};