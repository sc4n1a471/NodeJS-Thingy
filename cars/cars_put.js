const db = require('/cars/cars_db.js')
const carModel = require('/cars/car_model.js')

const checkData = async (id, table) => {
    console.log("====== checkData ======")
    console.log("table passed to checkData: ", table)
    const queryCommand = `SELECT * FROM ${table} WHERE license_plate = '${license_plate}'`
    return new Promise((resolve, reject) => {
        db.con.query(queryCommand, (error, results) => {
            if (!results[0]) {
                console.log(`No car with license plate ${license_plate}`)
                reject(`No car with license plate ${license_plate}`)
            } else {
                console.log(`Success: Car found with license plate '${license_plate}'`)
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

    // const table = await db.getTable(request)
    const table = "table1"
    console.log("Table I got: ", table)

    const newData = await checkData(parseInt(request.params.license_plate), table)
    if (newData !== "nope") {
        let finalizedData
        let command
        let rb = request.body

        if (table === 'table1') {
            console.log("Applied schema is for: table1")
            // finalizedData = {
            //     name: request.body.name,
            //     email: request.body.email,
            //     age: request.body.age,
            //     id: parseInt(request.params.id)
            // }
            finalizedData = new carModel.Car(
                rb.license_plate,
                rb.brand,
                rb.model
            )

            // if (finalizedData.name === undefined) {
            //     finalizedData.name = newData.name
            // }

            // if (finalizedData.age === undefined) {
            //     finalizedData.age = newData.age
            // }

            // if (finalizedData.email === undefined) {
            //     finalizedData.email = newData.email
            // }

            command = `UPDATE ${table} SET brand = (?),
                model = (?),
                WHERE license_plate = (?);`
        }
        // } else if (table === 'table2') {
        //     console.log("Applied schema is for: table2")
        //     finalizedData = {
        //         brand: request.body.brand,
        //         model: request.body.model,
        //         year: request.body.year,
        //         id: parseInt(request.params.id)
        //     }

            // ha nincs megadva érték a http body-ban, akkor tartsa meg az adatbázisban lévőt
            // ha megegyeznek a body-ban lévő értékek az adatbázis értékeivel, annak megfelelően frissítse az adatbázis nem egyező értékeit

            // command = db.cc.commandCreator(newData, finalizedData)
            // console.log("Received command:", command)

            //command_old = `UPDATE ${table} SET brand = (?),
            //    model = (?),
            //    year = (?)
            //    WHERE id = (?);`
        // }

        // console.log("Created command: ", command)

        db.con.query(command,(error, results) => {
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
                        message: finalizedData
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