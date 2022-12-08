const http = require('http')
const fs = require('fs')
const getHandler = require('./getHandler');
const postHandler = require('./postHandler');
const putHandler = require('./putHandler');
const deleteHandler = require('./deleteHandler');
const path ='./StudentList.json'
const rpcServer = require('rpc-websockets').Server;
const rpc = new rpcServer({ port: 4000, host: 'localhost'}); 

rpc.event('change')

fs.watch(path, (event, file) => {
    if (file) {
        console.log(`file: ${file}, event = ${event}`)
        rpc.emit('change')
    }
})

http.createServer((request, response) => {
    switch(request.method) {
        case 'GET': getHandler(request, response); break;
        case 'POST': postHandler(request, response); break;
        case 'PUT': putHandler(request, response); break;
        case 'DELETE': deleteHandler(request, response); break;
    }
}).listen(5000);