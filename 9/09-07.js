const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    let png = '';
    request.on('data', (chunk) => { png += chunk.toString();});
    request.on('end', () => {console.log('request.on(end) = ', png.length)});
}).listen(5000);

let bound = '---------------------------';
let body = `${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.png"\r\n';
    body += 'Content-Type: application/octet-stream\r\n\r\n';

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {'content-type':'multipart/form-data; boundary='+bound}
};

let request = http.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {data += chunk;});
});
request.write(body);

let stream = new fs.ReadStream('MyFile.png');
stream.on('data', (chunk) => {
    request.write(chunk); 
    console.log(Buffer.byteLength(chunk));
});
stream.on('end', () => {request.end(`\r\n${bound}\r\n`);}); 