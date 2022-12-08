const http = require('http');
const query = require('querystring');
const url = require('url');

http.createServer(function(request, response) {
    let data = '';
    request.on('data', chunk => {data += chunk.toString();})
    request.on('end', () => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end('x = '+query.parse(data).x+'; y = '+ query.parse(data).y+'; s = '+query.parse(data).s);
    });
}).listen(5000);

let param = query.stringify({x: 2, y: 8, s: 'aa'});
let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/x-www-form-urlencoded'}
};

let request = http.request(options, (res) => {
    console.log('Response status: ',res.statusCode);
    let data= '';
    res.on('data', (chunk) => {
        console.log('body: ',data += chunk.toString('utf8'));
    });
});

request.write(param);
request.end();