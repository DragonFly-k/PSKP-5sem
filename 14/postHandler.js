const url = require('url')
module.exports.post = (request, response, Db) => {
    let data = ''
    let path = url.parse(request.url).pathname.split('/')
    console.log(path)
    switch (path[2]) {
        case 'faculties':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.postFaculty(data.faculty, data.faculty_name)
                    .then(() => {response.end(JSON.stringify(data))})
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'pulpits':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200)
                Db.postPulpit(data.pulpit, data.pulpit_name, data.faculty)
                    .then(() => {response.end(JSON.stringify(data))})
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'subjects':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.postSubject(data.subject, data.subject_name, data.pulpit)
                    .then(() => {response.end(JSON.stringify(data))})
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'auditoriumstypes':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.postAuditoriumType(data.auditorium_type,data.auditorium_typename)
                    .then(() => {response.end(JSON.stringify(data))})
                    .catch((error) => {error400(response, error)})
            })
            break

        case 'auditoriums':
            request.on('data', (chunk) => {data += chunk})
            request.on('end', () => {
                data = JSON.parse(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                Db.postAuditorium(data.auditorium,data.auditorium_name,data.auditorium_capacity,data.auditorium_type)
                    .then(() => {response.end(JSON.stringify(data))})
                    .catch((error) => {error400(response, error)})
            })
            break
            
        default: error400(response, 'Invalid method'); break;
    }
}

function error400(response, error) {
    response.statusCode = 400
    response.statusMessage = 'Invalid method'
    response.end(JSON.stringify({error: error.message}))
}