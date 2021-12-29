const notes = require('./notes.js');
const yargs = require('yargs');
const { getNotes } = require('./notes.js');

//console.log(notes());

yargs.command({
	command:'add',
	describe:'Add new note',
	builder: {
		title:{
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		},
		body:{
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		},	
	},
	handler: function(argv){
		console.log("Title: "+argv.title);
		console.log("Body: "+argv.body);
		notes.addNotes(argv.title, argv.body);
	}
}
)

yargs.command({
	command:'remove',
	describe:'Remove new note',
	builder: {
		title:{
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		},	
	},
	handler: function(argv){
		notes.removeNote(argv.title);
	}
}
)
yargs.command({
	command:'read',
	describe:'Read notes',
	handler: function(){
		console.log("Read notes");
		notes.listNote();
	}
}
)
yargs.command({
	command:'list',
	describe:'List Notes',
	builder: {
		title:{
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		},	
	},
	handler: function(argv){
		console.log("List notes");
		notes.listNotes(argv.title);
	}
}
)
console.log(yargs.argv);


