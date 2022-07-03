const test_table = require('./test_table.js')
const db = require('../database/database.js')
const cc = require('../commandCreator.js')

const checkData = async (id, table) => {
    console.log("====== checkData ======")
    console.log("table passed to checkData: ", table)
    const queryCommand = `SELECT * FROM ${table} WHERE id = '${id}'`
    return new Promise((resolve, reject) => {
        db.con_test.query(queryCommand, (error, results) => {
            if (!results[0]) {
                console.log(`No data with id ${id}`)
                reject(`No data with id ${id}`)
            } else {
                console.log(`Success: Data found with id '${id}'`)
                console.log("====== checkData ======")
                resolve(results[0])
            }
        })
    }).catch(function() {
        console.log("reject")
        console.log("====== checkData ======")
        return "nope"
    })
}
const updateData = async (request, response) => {
    console.log("=========== updateData ===========")

    const table = await test_table.getTable(request)
    console.log("Table I got: ", table)

    const data = await checkData(parseInt(request.params.id), table)
    if (data !== "nope") {
        let data2
        let command

        if (table === 'table1') {
            console.log("Applied schema is for: table1")
            data2 = {
                name: request.body.name,
                email: request.body.email,
                age: request.body.age,
                id: parseInt(request.params.id)
            }

            if (data2.name === undefined) {
                data2.name = data.name
            }

            if (data2.age === undefined) {
                data2.age = data.age
            }

            if (data2.email === undefined) {
                data2.email = data.email
            }

            command = `UPDATE ${table} SET name = (?),
                email = (?),
                age = (?)
                WHERE id = (?);`
        } else if (table === 'table2') {
            console.log("Applied schema is for: table2")
            data2 = {
                brand: request.body.brand,
                model: request.body.model,
                year: request.body.year,
                id: parseInt(request.params.id)
            }

            // ha nincs megadva érték a http body-ban, akkor tartsa meg az adatbázisban lévőt
            // ha megegyeznek a body-ban lévő értékek az adatbázis értékeivel, annak megfelelően frissítse az adatbázis nem egyező értékeit

            command = cc.commandCreator(data, data2)
            console.log("Received command:", command)

            //command_old = `UPDATE ${table} SET brand = (?),
            //    model = (?),
            //    year = (?)
            //    WHERE id = (?);`
        }

        // console.log("Created command: ", command)

        db.con_test.query(command,(error, results) => {
            if (error) {
                response.json(
                    {
                        status: "error",
                        message: error
                    }
                )
            } else {
                console.log("Results: " + JSON.stringify(results))
                response.json(
                    {
                        status: "success",
                        message: data2
                    }
                )
            }
        })
    } else {
        response.json(
            {
                status: "error",
                message: "This data does not exist"
            }
        )
    }

    console.log("=========== updateData ===========")
}

module.exports = {
    updateData
}