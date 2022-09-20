var http = require("http");
var fs = require("fs");

http.createServer(function (request, response){
    let xmlhttp = fs.readFileSync('./xmlhttprequest.html');
    if(request.url === '/xmlhttprequest'){ 
    response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    response.end(xmlhttp);}
    else if(request.url === '/api/name'){ 
    response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
    response.end("Сятковская Екатерина Дмитриевна");}
    else{response.end();}
}).listen(5000);
console.log('server.listen(5000)');