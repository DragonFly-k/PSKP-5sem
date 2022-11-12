const http = require('http');
const query = require('querystring');
const url = require('url');

http.createServer(function(request, response) {
    let data = '';
    request.on('data', chunk => {data += chunk.toString();})
    request.on('end', () => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end('x = '+JSON.parse(data).x+'; y = '+ JSON.parse(data).y+'; s = '+JSON.parse(data).s);
    });
}).listen(5000);

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {
        'content-type' : 'appliation/json', 
        'accept' : 'application/json'
    }
};

let request = http.request(options, (res) => {
    console.log('Response status: ',res.statusCode);
    let data= '';
    res.on('data', (chunk) => {
        console.log('body: ',data += chunk.toString('utf8'));
    });
});

request.end(JSON.stringify({x: 2, y: 8, s: 'aaa'}));