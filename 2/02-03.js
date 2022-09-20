var http = require("http");
var fs = require("fs");

http.createServer(function (request, response){
    if(request.url === '/api/name'){ 
    response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
    response.end("Сятковская Екатерина Дмитриевна");}
    else{response.end();}
}).listen(5000);
console.log('server.listen(5000)');