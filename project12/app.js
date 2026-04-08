// Import modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// ---------------- DATABASE CONNECTION ----------------
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('DB Error:', err));

// ---------------- SCHEMA & MODEL ----------------
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// ---------------- ROUTES (CRUD) ----------------

// CREATE
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save(); // or User.create(req.body)
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (all users)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (single user)
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send('User deleted successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});