const fs = require('fs');
const listNotes = (title)=> {
	// return "Your notes...!!!";
	const notes = loadNotes();
	const note = notes.find((note)=> note.title===title);
	if(note===undefined){
		console.log("this title note doesnt exist");
	}else{
		console.log("title: "+ note.title);
		console.log("body: "+ note.body);
	}
}
const addNotes = (title, body) => {
	const notes = loadNotes();
	//console.log("inside add notes ="+notes);
	const duplicateNotes = notes.filter((note)=> note.title === title)
	// const duplicateNotes = notes.filter(function (note) {
	// 	return note.title === title;
	// })
	if (duplicateNotes.length === 0) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes);
		console.log("New Note added");
	} else {
		console.log("Title already taken");
	}

	//console.log("inside addNotes");
	//console.log(notes);
}

const saveNotes = (notes) =>{
	const dataJSON = JSON.stringify(notes);
	console.log(dataJSON);
	fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		//console.log("inside try");
		return JSON.parse(dataJSON);
	} catch (e) {
		console.log("inside catch");
		return [];
	}
}

const removeNote = (title) => {
	//console.log("Removing notes "+title);
	const notes = loadNotes();
	const notesToKeep = notes.filter((note)=>note.title != title)
	saveNotes(notesToKeep);
}

const listNote = () =>{
	const notes = loadNotes();
	notes.forEach(element => {
		console.log(element.title);
	});
}
module.exports = {
	listNotes: listNotes,
	addNotes: addNotes,
	removeNote: removeNote,
	listNote: listNote,
}