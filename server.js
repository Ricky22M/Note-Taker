/* Require Dependencies */
const express = require('express');
const fs = require('fs');
const path = require('path');

/* Creating App and setting up middleware */

// App is created with Express.js
const app = express();

// PORT for server is set to 3001
const PORT = process.env.PORT || 3001;

// Middleware being applied to app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

/* GET routes */

// Allows the user to get notes
app.get('/api/notes/:id', (req, res) => {
    res.json(allNotes[req.params.id]);
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        var allNotes = JSON.parse(data);
        res.json(allNotes);
    });
});

// Sends the user to the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Sends the user to the homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


/* POST route */

// This allows the user to create a new note for themselves
app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        var allNotes = JSON.parse(data);
        let userNotes = req.body;

        userNotes.id = Math.floor(Math.random() * 5000);
        allNotes.push(userNotes);

        fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err, data) => {
            if (err) {
                throw err;
            }
            
            res.json(userNotes);
        });
    });
});

/* Starts up server and listens to PORT */
app.listen(PORT, () => {
    console.log(`App now listening to port ${PORT}!`);
});