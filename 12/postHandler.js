const url = require('url')
const fs = require('fs')
const path = 'StudentList.json'

module.exports = (req, res) =>{
    let urll= url.parse(req.url).pathname

    switch (urll) {
        case '/':
            req.on('data', (data) => {
                let student = JSON.parse(data)
                let students = JSON.parse(fs.readFileSync(path).toString())
                let check = students.filter((item) => { return item.id === student.id})
                if (check.length > 0) {
                    res.writeHead(400)
                    res.end( JSON.stringify({"error": 3, "message": "Студент с id равным "+student.id+ " уже есть"}) )
                    return
                }
                students.push(student)
                fs.writeFileSync(path, JSON.stringify(students))
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',})
                res.end(data)
            })
            break;
        case '/backup':
            let date = new Date()
            let month = date.getMonth() + 1;
            if(month < 10) month = '0' + month;
            let day = date.getDate();
            if(day < 10) day = '0' + day;
            let hours = date.getHours();
            if(hours < 10) hours = '0' + hours;
            let minutes = date.getMinutes();
            if(minutes < 10) minutes = '0' + minutes;
            let newPath = `./backup/${date.getFullYear()}${month}${day}${hours}${minutes}_${path}`
            setTimeout(() => {
                fs.copyFileSync(path, newPath)
                res.end('OK')
            }, 2000)
            break;
    }
};