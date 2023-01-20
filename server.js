/* Require Dependencies */
const express = require('express');
const fs = require('fs');
const path = require('path');

/* Pathway to store all notes created */
const noteStorage = require('./db/db.json');

/* Creating App with Express and setting up middleware */
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('pubblic'));

/* GET routes */

app.get('/api/notes', (req, res) => {
    res.json(noteStorage.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

/* Starts up server and listens to PORT */
app.listen(PORT, () => {
    console.log(`App now listening to port ${PORT}!`);
});