const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        fs.readFile('home.html', (err, data) => {
            if (err) {
                res.write("Error loading home page");
                res.end();
            } else {
                res.end(data);
            }
        });
    } 
    else if (req.url === '/about') {
        fs.readFile('about.html', (err, data) => {
            if (err) {
                res.write("Error loading about page");
                res.end();
            } else {
                res.end(data);
            }
        });
    } 
    else {
        fs.readFile('404.html', (err, data) => {
            res.end(data);
        });
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});