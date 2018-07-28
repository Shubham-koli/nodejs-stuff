

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');



var argv = yargs.command('add', 'Add a new note',{
    title: {
        describe: 'Title of new note',
        demand: true,
        alias: 't'
    },
    body: {
        describe: 'Body of a new note',
        demand: true,
        alias: 'b'
    }
})
.command('list', 'List all notes')
.command('read', 'Read perticular note', {
    title: {
        describe: 'Title of the note',
        demand: true,
        alias: 't'
    }
})
.command('remove', 'Delete perticular note', {
    title: {
        describe: 'Titile of the note',
        demand: true,
        alias: 'rm'
    }
})
.help()
.argv;
var command = argv._[0];


if(command === 'add')
{
    var result = notes.addNote(argv.title, argv.body);
    //console.log(result);
    if(result == null)
    {
        console.log("Can't add this Note \nbecause note with this Title already exists.");
    }
    else
    {
        console.log("Note Successfully added");
    }
}
else if(command === 'remove')
{
    var res = notes.removeNote(argv.title);
    var msg = res ? 'Note Removed.': 'Note Not Found.'
    console.log(msg);
}
else if(command === 'list')
{
    notes.getAll();
}
else if(command === 'read')
{
    var res = notes.getNote(argv.title);
    if(res != null)
    {
        console.log(res[0]); 
    }
    else
    {
        console.log('Note Not Found');
    }
}
else if(command === '' || command == undefined)
{
    console.log('Please enter the command');
}
else
{
    console.log('command not recognized');    
}