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
    const { title, text } = req.body;
    let id = uuid();
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const notesDB = JSON.parse(data);
        notesDB.push({ title, text, id });
        const newDB = JSON.stringify(notesDB);
        fs.writeFile('./db/db.json', 'utf-8', newDB, (err, data) => {
            if (err) {
                console.error();
            } else {
                console.log('Added New Note!');
            }
        });
    });
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const deleteNote = JSON.parse(data);
        let deleteUserId = req.params.id.toString();
    });
});

app.listen(PORT, () => {
    console.log(`App is now listening to PORT: ${PORT}`);
});