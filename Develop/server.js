// Require express
const path = require('path');
const express = require('express');

// Require the 'db.json' file and store it in a variable called 'notes'
const notes = require('./db/db.json');
const PORT = 3001;

// Use express to initialize the 'app' server
const app = express();

// Have the 'app' use appropriate middleware to parse body data
app.use(express.static('Develop'));

// GET /notes should return the notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET * should return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// GET /api/notes should read the db.json file
// app.get('/api/notes', (req, res) => res.json(notes));

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file and then return the new note to the client

    // fs.writeFile

// Use the 'app' to 'listen' to a specific 'PORT'
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
 