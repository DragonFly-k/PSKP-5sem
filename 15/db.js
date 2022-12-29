const MongoClient = require('mongodb').MongoClient;

class DB {
    constructor()
    {
        this.url = 'mongodb+srv://Ks7631738:Ks7631738@cluster0.a1lvziw.mongodb.net/test';
        this.client = new MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
        this.client = this.client.connect().then(connection => {return connection.db("BSTU")});
        console.log("Connected to MongoDB");
    }

    GetRecord(tableName, fields) {
        return this.client
            .then(db => {return db.collection(tableName).findOne(fields);})
            .then(record => {if (!record) throw 'No records';return record;});
    }

    UpdateFaculty(fields, newName) {
        return this.client
            .then(async db => {db.collection('faculty')
                .findOneAndUpdate(
                    { faculty: fields.faculty },
                    { $set: { faculty_name: newName } },
                    { returnDocument: "after" });
                    return db.collection('faculty').findOne(fields);
            })
    }

    UpdatePulpit(fields, newName, newFac) {
        return this.client
            .then(async db => {db.collection('pulpit')
                .findOneAndUpdate(
                    { pulpit: fields.pulpit },
                    { $set: {pulpit_name: newName, faculty: newFac} },
                    { returnDocument: "after" });
                    return db.collection('pulpit').findOne(fields);
            })
    }

    DeleteFaculty(fac) {
        return this.client.then(async db => {
            return db.collection('faculty').findOneAndDelete({ faculty: fac });})
    }

    DeletePulpit(pul) {
        return this.client.then(async db => {
            return  db.collection('pulpit').findOneAndDelete({ pulpit: pul });})
    }

    async GetAllRecordsFromCollection(collection) {
        try {
            let db = await this.client
            return await db.collection(collection).find({}).toArray()
        } catch (e) {return e}
    }

    async GetRecords(collection, filter) {
        try {
            let db = await this.client
            return await db.collection(collection).findOne(filter)
        } catch (e) {return e}
    }

    async GetFaculty(filter) {
        try {
            let db = await this.client
            let faculty = await db.collection('faculty').findOne(filter)
            return faculty === null ? {} : faculty
        } catch (e) {return e}
    }

    async GetFaculties(filter) {
        try {
            let db = await this.client
            return await db.collection('faculty').find(filter).toArray()
        } catch (e) {return e }
    }

    async GetPulpit(filter) {
        try {
            let db = await this.client
            return await db.collection('pulpit').findOne(filter)
        } catch (e) { return e }
    }

    async GetPulpits(filter) {
        try {
            let db = await this.client
            return await db.collection('pulpit').find(filter).toArray()
        } catch (e) { return e}
    }

    async GetPulpitsByFaculties(faculties) {
        try {
            faculties = faculties.split(',')
            let pulpits = []
            for (let faculty of faculties) {
                pulpits.push(...(await this.GetPulpits({ faculty: faculty })))
            }
            return pulpits
        } catch (e) { return e}
    }

        InsertFaculty(fields) {
        return this.client.then(async db => {
            let tableCol= JSON.parse('{"faculty": "'+ fields.faculty +'"}');
            console.log(fields.faculty);
            await db.collection('faculty').findOne(tableCol).then(record => {
                if (record) throw 'this document already exists';
                return record;
            });
            db.collection('faculty').insertOne(fields, (err, r) =>{
                if(err) console.log(err);
                else console.log(r.insertedCount);
            });
            return this.GetRecord('faculty', tableCol);
        });
    }
    
    InsertPulpit(fields) {
        return this.client.then(async db => {
            let tableCol= JSON.parse('{"pulpit": "'+ fields.pulpit +'"}');
            console.log(fields.pulpit);
            await db.collection('pulpit').findOne(tableCol).then(record => {
                if (record) throw 'this document already exists';
                return record;
            });
            db.collection('pulpit').insertOne(fields, (err, r) =>{
                if(err) console.log(err);
                else console.log(r.insertedCount);
            });
            return this.GetRecord('pulpit', tableCol);
        });
    }

    async InsertPulpits(data, transactionOptions) {
        let client = new MongoClient(this.url)
        await client.connect()
        let collection = client.db('BSTU').collection('pulpit')
        let session = client.startSession()
        try {
            session.startTransaction(transactionOptions)
            console.log(data)
            for (let pulpit of data) {
                if (await collection.findOne({ pulpit: pulpit.pulpit },{ session })) {
                    throw {error: `pulpit ${pulpit.pulpit} already exists`,}
                }
                await collection.insertOne(pulpit, { session })
                console.log(`inserted ${pulpit.pulpit}`)
            }
            await session.commitTransaction()
            return data
        } catch (e) {
            await session.abortTransaction()
            return e
        } finally {
            await session.endSession()
        }
    }
    
}
module.exports = DB;