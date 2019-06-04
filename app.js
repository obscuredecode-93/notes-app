const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type:'string'
        }
    },

    handler(argv){
        notes.addNotes(argv.title,argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title:{
            demandOption: true
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command: 'list',
    describe: 'list out all notes',
    handler(){
        notes.listNotes();
    }
})
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            demandOption: true
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

//add.remove,read,list

//console.log(yargs.argv);
yargs.parse();
