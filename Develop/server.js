const path = require('path');
const fs = require('fs');

// Require express
const express = require('express');

// Require the 'db.json' file and store it in a variable called 'notes'
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

// Use express to initialize the 'app' server
const app = express();

// Have the 'app' use appropriate middleware to parse body data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /notes should return the notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET /api/notes should read the db.json file
app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file and then return the new note to the client
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note`);

    const { title, text } = req.body;
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
        };

        // Add a new note
        notes.push(newNote);
    
        // Convert the data to a string so we can save it
        const noteString = JSON.stringify(notes);

        // Write the string to a file
        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `New note has been written to JSON file`
                )
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// GET * should return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
    
// Use the 'app' to 'listen' to a specific 'PORT'
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
 