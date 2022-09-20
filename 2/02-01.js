var http = require("http");
var fs = require("fs");

http.createServer(function (request, response){
    let html = fs.readFileSync('./index.html');
    if(request.url === '/html'){ 
    response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    response.end(html);}
    else {response.end();}
}).listen(5000);
console.log('server.listen(5000)');