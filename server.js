const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__filename, './db/db.json'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let allNotes = JSON.parse(fs.readFile('./db/db.json', 'utf8'));
    let noteLength = allNotes.noteLength.toString();
    
    newNote.id = noteLength

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.sendFile(allNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = req.body.id.stringify();

    allNotes = allNotes.filter(selected => {
        return selected.id != noteId;
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);
});

app.listen(PORT, () => {
    console.log(`App is now listening to PORT: ${PORT}`);
});