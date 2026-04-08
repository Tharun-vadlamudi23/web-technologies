// Import express
const express = require('express');

// Create app
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample in-memory data
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Express REST API');
});

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET single user (route parameter)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

// POST - create user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - update user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = req.body.name;
    res.json(user);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send('User deleted successfully');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});