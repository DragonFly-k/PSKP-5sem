const { MongoClient } = require('mongodb');
const {ServerApiVersion} = require('mongodb');
const http = require('http');
const URL = require('url');

const {GetHandler} =  require('./getHandler');
const {PostHandler} = require('./postHandler');
const {PutHandler} = require('./putHandler');
const {DeleteHandler} = require('./deleteHandler');

const uri = "mongodb+srv://Ks7631738:Ks7631738@cluster0.a1lvziw.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = 'BSTU';
const facultyCollection = 'faculty';
const pulpitCollection = 'pulpit';

client.connect().then(r => {console.log('Connected successfully to server')}).catch(err => {console.log(err)});
const db = client.db(dbName);
const faculty = db.collection(facultyCollection);
const pulpit = db.collection(pulpitCollection);

http.createServer((req, res) => {
    let url = decodeURI(req.url);
    let method = req.method;
    console.log(req.method + ' ' + url);
    switch (method)
    {
        case 'GET':
            GetHandler(url, res,faculty,pulpit);
            break;
        case 'POST':
            PostHandler(url, req, res,faculty,pulpit,client);
            break;
        case 'PUT':
            PutHandler(url,req, res,faculty,pulpit);
            break;
        case 'DELETE':
            DeleteHandler(url, res,faculty,pulpit);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
    }
}).listen(3000, () => {console.log('Server started on port 3000');});

exports.WriteToJson = (r, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(r));
}

exports.WriteError = (err, res) => {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(err));
}

