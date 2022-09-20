var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./db.js');

var db = new data.DB();
db.on('GET', (request, response) => {
    console.log('GET');
    response.end(JSON.stringify(db.get()));
});
db.on('POST', (request, response) => {
    console.log('POST');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        db.post(row);
        response.end(JSON.stringify(row));
    });
});
db.on('DELETE', (request, response) => {
    console.log('DELETE');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        let deleteObj = db.delete(row.id);
        console.log(deleteObj);
        response.end(JSON.stringify(deleteObj));
    });
});
db.on('PUT', (request, response) => {
    console.log('PUT');
    request.on('data', data => 
    {
        let row = JSON.parse(data);
        db.put(row);
        console.log(row);
        response.end(JSON.stringify(row));
    });
});

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./04-02.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
    else if (url.parse(request.url).pathname === '/api/db')
    {
        db.emit(request.method, request, response);
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/api/db');