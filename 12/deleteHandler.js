const url = require('url')
const fs = require('fs')
const path = 'StudentList.json'

module.exports = (req, res) =>{
    let urll= url.parse(req.url).pathname

    if (urll.match(/^\/(\d+)$/)) {
        let file = fs.readFileSync(path)
        let students = JSON.parse(file.toString())
        let index = students.findIndex((student) => {return student.id === Number(urll.match(/\/(\d+)$/)[1])})
        if (index === -1) { 
            res.end( JSON.stringify({"error": 2, "message": "Студент с id равным "+urll.match(/^\/(\d+)$/)[1]+ " не найден"}) )
            return
        }
        let student = students[index] 
        students.splice(index, 1)
        fs.writeFileSync(path, JSON.stringify(students))
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        res.end(JSON.stringify(student, null, '    '))
        return
    } 
    else if (urll.match(/^\/backup\/(\d{4})(\d{2})(\d{2})$/)) {
        let backupPath = urll.match(/^\/backup\/(\d{4})(\d{2})(\d{2})$/);
        let deleteDate = new Date(Number(backupPath[1]), Number(backupPath[2]), Number(backupPath[3]))

        let files = fs.readdirSync('./backup')
        files.forEach((file) => {
            let filePath = file.match(/^(\d{4})(\d{2})(\d{2})\d{4}_StudentList.json$/)
            if (filePath) {
                let date = new Date(Number(filePath[1]), Number(filePath[2]), Number(filePath[3]))
                if (date < deleteDate) {
                    fs.unlinkSync('./backup/' + filePath[0])
                    res.write(filePath[0])
                }
            }
        })
        res.end()
        return
    }

    res.writeHead(404)
    res.end('ERROR')
    return
};