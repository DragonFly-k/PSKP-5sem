const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    let read = fs.createReadStream('MyFile.png');
    read.on('end', () => {response.end();});
    read.pipe(response);
}).listen(5000);

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET'
};

let request = http.request(options, (response) => {
    response.pipe(fs.createWriteStream('Cat.png'));
});
request.end();