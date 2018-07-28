
const fs = require('fs');

//Takes JSON objects from the notes-data.json file.
var fetchNotes = () =>                              
{
    try
    {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);

    }catch(err)
    {
        console.log('The File Does NOT exist...\n Creating the File.');
        return [];
    }
};

// saves notes into the notes-data.json file
var saveNotes = (notes) =>                  
{
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// This function is used to Add note into the notes-data.json file. 
var addNote = (Title, Body) =>
{
    console.log(`Title of Note is ${Title} \nThe body is ${Body}`);
    var notes = [];
    var note = {
                    Title,
                    Body        
               };    
    
    notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.Title === Title );
    
    if(duplicateNotes.length === 0)
    {
        notes.push(note);
        saveNotes(notes);
        return 1;    
    }
    else
    {
        return null;
    }
    
};

var getAll = () =>
{
    var allNotes = fetchNotes();
    console.log(allNotes);
     
};

var removeNote = (Title) =>
{
    var note = {
                Title      
               };
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.Title != Title );
    saveNotes(duplicateNotes);
    if(notes.length !== duplicateNotes.length)
    {
        return 1;
    }
    else
    {
        return 0;
    }
};

var getNote = (Title) =>
{
    var note = {
                Title
               };
    var notes = fetchNotes();
    var readNote = notes.filter((note) => note.Title ===  Title );
    if(readNote.length != 0)
    {
        debugger;
        return readNote;
    }
    else
    {
        return null;
    }
};

module.exports =
{
    addNote,
    getAll,
    removeNote,
    getNote
};