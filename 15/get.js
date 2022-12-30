const URL = require("url");
const {WriteToJson} = require('./SqlService');
const {WriteError} = require('./SqlService');
exports.GetHandler = (url, res, faculty, pulpit) =>
{
   let path = url.split('/');
   const parsedUrl = URL.parse(url);
   switch (true) {
      case url === '/api/faculties':
         faculty.find().toArray().then(r => {WriteToJson(r, res);})
         .catch(err => {WriteError(err, res);});
         break;
      case (url === '/api/pulpits'):
         pulpit.find().toArray().then(r => {WriteToJson(r, res);})
         .catch(err => {WriteError(err, res);});
         break;
      case path[1] + '/' + path[2] === 'api/faculties' && path[3] !== undefined:
         faculty.find({faculty: path[3]}).toArray().then(r => {
            if (r.length === 0) {
               res.writeHead(404, {'Content-Type': 'text/plain'});
               res.end("Faculty don't exist.");
            } else { WriteToJson(r, res);}
         }).catch(err => {WriteError(err, res);});
         break;
      case path[1] +'/' + path[2] === 'api/pulpits' && path[3]!== undefined:
         pulpit.find({pulpit: path[3]}).toArray().then(r => {
         if (r.length === 0) {
               res.writeHead(404, {'Content-Type': 'text/plain'});
               res.end("Pulpit don't exist.");
         } else {WriteToJson(r, res);}
         }).catch(err => {WriteError(err, res); });
         break;
      case parsedUrl.pathname === "/api/pulpits" && parsedUrl.query !== null: 
         const query = parsedUrl.query.split('=');          
         const pulpits = query[1].split(',');
            pulpit.find({faculty: {$in: pulpits}}).toArray()
            .then(r => { WriteToJson(r, res);})
            .catch(err => { WriteError(err, res);});
         break;
      default:
         res.writeHead(404, {'Content-Type': 'text/plain'});
         res.end('Not found');
   }
};