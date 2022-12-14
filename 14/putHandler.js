const url = require('url')
module.exports.put = (request, response, Db) => {
    let data = ''
    let path = url.parse(request.url).pathname.split('/')
    switch (path[2]) {
        case 'faculties':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.getFaculty(data.faculty)
                    .then((records) => {
                        if (records.recordset.length == 0) {throw 'No such faculty'}
                        Db.putFaculty(data.faculty, data.faculty_name)
                            .then(() => {response.end(JSON.stringify(data))})
                            .catch((error) => {error400(response, error)})
                    })
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'pulpits':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.getPulpit(data.pulpit)
                    .then((records) => {
                        if (records.recordset.length == 0) {throw 'No such pulpit'}
                        Db.putPulpit(data.pulpit,data.pulpit_name,data.faculty)
                            .then(() => {response.end(JSON.stringify(data))})
                            .catch((error) => {error400(response, error)})
                    })
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'subjects':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.getSubject(data.subject)
                    .then((records) => {
                        if (records.recordset.length == 0) {throw 'No such subject'}
                        Db.putSubject(data.subject,data.subject_name,data.pulpit)
                        .then(() => {response.end(JSON.stringify(data))})
                        .catch((error) => {error400(response, error)})
                    })
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'auditoriumstypes':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.getAuditoriumType(data.auditorium_type)
                    .then((records) => {
                        if (records.recordset.length == 0) {throw 'no such auditorium_type'}
                        Db.putAuditoriumType(data.auditorium_type,data.auditorium_typename)
                        .then(() => {response.end(JSON.stringify(data))})
                        .catch((error) => {error400(response, error)})
                    })
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'auditoriums':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.getAuditorium(data.auditorium)
                    .then((records) => {
                        if (records.recordset.length == 0) {throw 'No such auditorium'}
                        Db.putAuditorium(data.auditorium,data.auditorium_name,data.auditorium_capacity,data.auditorium_type)
                        .then(() => {response.end(JSON.stringify(data))})
                        .catch((error) => {error400(response, error)})
                    })
                    .catch((error) => {error400(response, error)})
            })
            break

        default:error400(response, 'Invalid method');break;
    }
}

function error400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(JSON.stringify({error: error.message}))
}