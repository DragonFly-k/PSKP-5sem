const {WriteToJson} = require('./SqlService');
const {WriteError} = require('./SqlService');

exports.DeleteHandler = (url, res,faculty,pulpit) => {
    let path = url.split('/');
    switch (true) {
        case path[1] + '/' + path[2] === 'api/faculties' && path[3] !== undefined :
            faculty.findOneAndDelete({faculty: path[3]})
            .then(r => {WriteToJson(r, res);})
            .catch(err => {WriteError(err, res);});
            break;
        case path[1] + '/' + path[2] === 'api/pulpits' && path[3]!== undefined:
            pulpit.findOneAndDelete({pulpit: path[3]})
            .then(r => {WriteToJson(r, res);})
            .catch(err => {WriteError(err, res);});
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
    }
};