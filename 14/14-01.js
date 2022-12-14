const http = require('http')
const DB = require('./db')
const Db = new DB()
const {get} = require('./getHandler')
const {post}= require('./postHandler')
const {put}= require('./putHandler')
const {del}= require('./deleteHandler')

http.createServer((request, response) => {
    console.log(request.method)
    response.setHeader('Access-Control-Allow-Origin', '*')
    switch (request.method) {
        case 'GET':get(request, response, Db);break;
        case 'POST':post(request, response, Db);break;
        case 'PUT':put(request, response, Db);break;
        case 'DELETE':del(request, response, Db);break;
        default:error400(response, 'Invalid method');break;
    }
}).listen(3000)

function error400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(JSON.stringify({error: error})
    )
}