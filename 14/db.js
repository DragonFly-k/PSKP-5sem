const sql = require('mssql')

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'nj',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    pool: {max: 10, min: 4,},
}

class DB {
    constructor() {
        this.connectionPool = new sql.ConnectionPool(config).connect()
            .then((pool) => {
                console.log('Connected to MSSQL')
                return pool
            })
            .catch((err) => console.log('Connection Failed: ', err))
    }

    // --select---
    async getFaculties() {
        return this.connectionPool.then((pool) =>
            pool.request().query('Select * FROM FACULTY')
        )
    }

    async getPulpitsByFaculty(faculty) {
        return this.connectionPool.then((pool) =>
            pool.request().input('faculty', sql.VarChar, faculty)
                .query('select * from pulpit where faculty = @faculty')
        )
    }

    async getPulpits() {
        return this.connectionPool.then((pool) =>
            pool.request().query('Select * FROM PULPIT')
        )
    }

    async getSubjects() {
        return this.connectionPool.then((pool) =>
            pool.request().query('Select * FROM SUBJECT')
        )
    }

    async getAuditoriumTypes() {
        return this.connectionPool.then((pool) =>
            pool.request().query('Select * FROM AUDITORIUM_TYPE')
        )
    }

    async getAuditoriumType(type) {
        return this.connectionPool.then((pool) =>
            pool.request().input('type', sql.VarChar, type)
                .query('Select * FROM AUDITORIUM_TYPE where auditorium_type = @type')
        )
    }

    async getAuditoriums() {
        return this.connectionPool.then((pool) =>
            pool.request().query('Select * FROM AUDITORIUM')
        )
    }

    async getAuditoriumByType(type) {
        return this.connectionPool.then((pool) =>
            pool.request().input('type', sql.VarChar, type)
                .query('Select * FROM AUDITORIUM where auditorium_type = @type')
        )
    }

    async getPulpit(pulpit) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('pulp', sql.NVarChar, pulpit)
                .query('Select * from PULPIT where pulpit = @pulp')
        })
    }

    async getFaculty(faculty) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('facul', sql.NVarChar, faculty)
                .query('Select * from FACULTY where faculty = @facul')
        })
    }

    async getSubject(subject) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('sub', sql.NVarChar, subject)
                .query('Select * from Subject where subject = @sub')
        })
    }

    async getAuditorium(audit) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('audit', sql.NVarChar, audit)
                .query('Select * from AUDITORIUM where AUDITORIUM = @audit')
        })
    }

    // --insert---
    async postFaculty(faculty, faculty_name) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('INSERT FACULTY(FACULTY, FACULTY_NAME) values(@faculty , @faculty_name)')
        })
    }

    async postPulpit(pulpit, pulpit_name, faculty) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) values(@pulpit , @pulpit_name, @faculty)')
        })
    }

    async postSubject(subject, subject_name, pulpit) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('INSERT SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values(@subject , @subject_name, @pulpit)')
        })
    }

    async postAuditoriumType(auditorium_type, auditorium_typename) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('INSERT AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@auditorium_type , @auditorium_typename)')
        })
    }

    async postAuditorium(auditorium,auditorium_name,auditorium_capacity,auditorium_type) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)' +
                        ' values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)')
        })
    }

    //--update--
    async putFaculty(faculty, faculty_name) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('UPDATE FACULTY SET FACULTY_NAME = @faculty_name WHERE FACULTY = @faculty')
        })
    }

    async putPulpit(pulpit, pulpit_name, faculty) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('UPDATE PULPIT SET PULPIT_NAME = @pulpit_name, FACULTY = @faculty WHERE PULPIT = @pulpit')
        })
    }

    async putSubject(subject, subject_name, pulpit) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('UPDATE SUBJECT SET SUBJECT_NAME = @subject_name, PULPIT = @pulpit WHERE SUBJECT = @subject')
        })
    }

    async putAuditoriumType(auditorium_type, auditorium_typename) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @auditorium_typename WHERE AUDITORIUM_TYPE = @auditorium_type')
        })
    }

    async putAuditorium(auditorium,auditorium_name,auditorium_capacity,auditorium_type) {
        return this.connectionPool.then((pool) => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('UPDATE AUDITORIUM SET AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE =  @auditorium_type' +
                        ' WHERE AUDITORIUM = @auditorium')
        })
    }

    //--delete--
    async deleteFaculty(faculty) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('faculty', sql.NVarChar, faculty)
                .query('DELETE FROM FACULTY WHERE FACULTY = @faculty')
        })
    }

    async deletePulpit(pulpit) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('pulpit', sql.NVarChar, pulpit)
                .query('DELETE FROM PULPIT WHERE PULPIT = @pulpit')
        })
    }

    async deleteSubject(subject) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('subject', sql.NVarChar, subject)
                .query('DELETE FROM SUBJECT WHERE SUBJECT = @subject')
        })
    }

    async deleteAuditoriumType(auditorium_type) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = @auditorium_type')
        })
    }

    async deleteAuditorium(auditorium) {
        return this.connectionPool.then((pool) => {
            return pool.request().input('auditorium', sql.NVarChar, auditorium)
                .query('DELETE FROM AUDITORIUM WHERE AUDITORIUM = @auditorium')
        })
    }
}
module.exports = DB