const url = require('url')

module.exports.del = (request, response, Db) => {
    const ur = decodeURI(url.parse(request.url).pathname);
    let path =ur.split('/');
    switch (path[2]) {
        case 'faculties':
            response.writeHead(200, { 'Content-Type': 'text/plain'});
            Db.getFaculty(path[3])
                .then((records) => {
                    if (records.recordset.length == 0) { throw 'no such faculty';}
                    Db.deleteFaculty(path[3])
                        .then(() => {response.end(JSON.stringify(records.recordset[0]))})
                        .catch(error => { error400(response,  error)});
                })
                .catch(error => { error400(response,  error)});
            break

        case 'pulpits':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getPulpit(path[3])
                .then((records) => { 
                    if (records.recordset.length == 0) {throw 'No such pulpit'}
                    Db.deletePulpit(path[3])
                        .then(() => {response.end(JSON.stringify(records.recordset[0]))})
                        .catch((error) => {error400(response, error)})
                })
                .catch((error) => {error400(response, error)})
            break

        case 'subjects':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getSubject(path[3])
                .then((records) => {
                    if (records.recordset.length == 0) {throw 'No such subject'}
                    Db.deleteSubject(path[3])
                        .then(() => {response.end(JSON.stringify(records.recordset[0]))}) 
                        .catch((error) => {error400(response, error)})
                })
                .catch((error) => {error400(response, error)})
            break

        case 'auditoriumstypes':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getAuditoriumType(path[3])
                .then((records) => {
                    if (records.recordset.length == 0) {throw 'No such auditorium type'}
                    Db.deleteAuditoriumType(path[3])
                    .then(() => {response.end(JSON.stringify(records.recordset[0]))})
                    .catch((error) => {error400(response, error)})
                })
                .catch((error) => {error400(response, error)})
            break

        case 'auditoriums':
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            Db.getAuditorium(path[3])
                .then((records) => {
                    if (records.recordset.length == 0) { throw 'no such auditorium'}
                    Db.deleteAuditorium(path[3])
                    .then(() => {response.end(JSON.stringify(records.recordset[0]))})
                    .catch((error) => {error400(response, error)})
                })
                .catch((error) => {error400(response, error)})
            break

        default: error400(response, 'Invalid method');break;
    }
}

function error400(response, error) {
    response.statusCode = 400;
    response.end(`{"error message": "${error}"}`)
}