// Requiring Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Creates PORT to connectable PORT or sets PORT to 3001
const PORT = process.env.PORT || 3001;

// Sets up app with Express
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Route to the db.json file and returns all saved user input from the notes
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__filename, './db/db.json'));
});

// Route to index.html file (start up/main page)
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Allows the user to post their notes into the db.json file
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let allNotes = JSON.parse(fs.readFile('./db/db.json', 'utf8'));
    let noteLength = allNotes.noteLength.toString();
    
    newNote.id = noteLength

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.sendFile(allNotes);
});

// Allows the user to delete user input notes from the db.json and remove them from the page
app.delete('/api/notes/:id', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = req.body.id.stringify();

    allNotes = allNotes.filter(selected => {
        return selected.id != noteId;
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);
});

// Starts up the app by listening to the PORT when deployed and console logs the PORT
app.listen(PORT, () => {
    console.log(`App is now listening to PORT: ${PORT}`);
});