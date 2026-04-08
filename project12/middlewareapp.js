// Import express
const express = require('express');

// Create app
const app = express();
const PORT = 3000;

// ---------------- GLOBAL MIDDLEWARE ----------------

// Middleware 1: Log request details
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[GLOBAL 1] ${req.method} ${req.url} - ${timestamp}`);
    next(); // pass control
});

// Middleware 2: Additional processing
app.use((req, res, next) => {
    console.log("[GLOBAL 2] Middleware executed");
    next();
});

// Middleware 3: JSON parser
app.use(express.json());

// ---------------- ROUTE-LEVEL MIDDLEWARE ----------------

// Custom middleware for specific route
const routeMiddleware = (req, res, next) => {
    console.log("[ROUTE] Route-specific middleware executed");
    next();
};

// ---------------- ROUTES ----------------

// Default route
app.get('/', (req, res) => {
    res.send('Home Page - Middleware Demo');
});

// Route with middleware chaining
app.get('/users', routeMiddleware, (req, res) => {
    console.log("[HANDLER] Sending users response");
    res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]);
});

// POST route demonstrating request preprocessing
app.post('/data', routeMiddleware, (req, res) => {
    console.log("[HANDLER] Received data:", req.body);
    res.json({
        message: "Data received successfully",
        data: req.body
    });
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});