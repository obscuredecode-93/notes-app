const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("note saved"));
    }
    else{
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const loadNotes = function(){

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}
const removeNote = (title) => {
    const notes = loadNotes();
    const removedNotes = notes.filter((notes) => !(notes.title === title))
    if(notes.length > removedNotes.length){
        saveNotes(removedNotes);
        console.log(chalk.green.inverse('Note removed!'));
    }
    else
    {
        console.log(chalk.red.inverse('No note got removed'));
    }
}
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes"));
    notes.forEach(element => {
        console.log(" Title: "+ element.title + "  Description: " + element.body );
    });
}
const readNote = (title) => {
    const notes = loadNotes();
    const note  = notes.find((note) => note.title === title);
    if(!note){
        console.log(chalk.inverse("Cannot find note"));
    }
    else{
        console.log(note.body);
    }
}

module.exports = {
    addNotes,
    removeNote,
    listNotes,
    readNote
};