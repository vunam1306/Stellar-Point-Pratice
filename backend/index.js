const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Port for the API server

// --- MIDDLEWARE ---
app.use(cors());
// Allow the server to read JSON data from the request body
app.use(express.json());

// --- MOCK DATABASE ---
// Storage in an-memory array
let pets = [
    { id: 1, name: 'Nick', weight: 5, type: 'dog' },
    { id: 2, name: 'John', weight: 3, type: 'cat' }
];
let nextId = 3; // auto increment ID for new pets

// --- API ENDPOINTS ---
// 1. GET: Get list of pets
app.get('/pets', (req, res) => {
    console.log('GET /pets - Returning pet list');
    res.json(pets); // respond with the list of pets in JSON format
});

// 2. POST: add more pet
app.post('/pets', (req, res) => {
    const { petName, petWeight, petType } = req.body;
    console.log('POST /pets - Received:', req.body);

    // Validate input
    if (!petName || !petWeight || !petType) {
        return res.status(400).json({ message: 'Please provide name, weight, and type' });
    }

    const newPet = {
        id: nextId++,
        name: petName,
        weight: parseFloat(petWeight),
        type: petType
    };

    pets.push(newPet);
    res.status(201).json(newPet); // respond with the newly created pet
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Pet Store API is running at http://localhost:${port}`);
});