const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }

    else if (req.url === '/create') {
        fs.writeFile('demo.txt', 'Hello Tharun!', (err) => {
            res.end(err ? 'Error creating file' : 'File created successfully');
        });
    }

    else if (req.url === '/read') {
        fs.readFile('demo.txt', 'utf8', (err, data) => {
            res.end(err ? 'Error reading file' : data);
        });
    }

    else if (req.url === '/append') {
        fs.appendFile('demo.txt', '\nAppended Text!', (err) => {
            res.end(err ? 'Error appending file' : 'Data appended');
        });
    }

    else if (req.url === '/delete') {
        fs.unlink('demo.txt', (err) => {
            res.end(err ? 'Error deleting file' : 'File deleted');
        });
    }

    else {
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});