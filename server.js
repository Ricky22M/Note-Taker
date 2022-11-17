const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/idex.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.get('/api/notes/:id', (req,res) => {
    res.json(notes[req.params.id]);
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        let userNotes = req.body;
        userNotes.id = Math.floor(Math.random() * 10000);
        notes.push(userNotes);
    });
    fs.writeFile('./db/db.json', 'utf8', (err, data) => {
        res.json(userNotes);
    });
});

app.listen(PORT, () => {
    console.log(`App is now listening to PORT: ${PORT}`);
});