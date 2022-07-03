const db = require('../database/database.js')
const cc = require('../commandCreator.js')
const carModel = require('./car_model.js')
const {Car} = require("./car_model");

const checkData = async (license_plate, table) => {
    console.log("====== checkData ======")
    console.log("table passed to checkData: ", table)
    const queryCommand = `SELECT * FROM ${table} WHERE license_plate = '${license_plate}'`
    return new Promise((resolve, reject) => {
        db.con_cars.query(queryCommand, (error, results) => {
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
    // console.log((request.params))

    const oldData = await checkData(request.params.license_plate, table)

    if (oldData !== "nope") {
        let oldCar = new Car(oldData.license_plate, oldData.brand, oldData.model, oldData.codename, oldData.year, oldData.comment)
        // let oldCarInfo = oldCar.info()

        let finalizedData
        // let newCarInfo = {}
        let command
        let rb = request.body

        if (table === 'table1') {
            console.log("Applied schema is for: table1")

            finalizedData = new carModel.Car(
                request.params.license_plate
            )

            // console.log("new: ", rb)
            // console.log("old: ", oldCar)
            // console.log("finalized1: ", finalizedData)

            for (let [key, value] of Object.entries(oldCar)) {
                // console.log("key: ", key)
                // console.log("value: ", value)
                for (let [newKey, newValue] of Object.entries(rb)) {
                    // console.log("newkey: ", newKey)
                    // console.log("newvalue: ", newValue)
                    if (key === newKey) {
                        finalizedData[key] = newValue;
                        // console.log("changed: ", key)
                        // console.log("to: ", newValue);
                        break;
                    } else {
                        finalizedData[key] = value;
                    }
                    // console.log("===")

                }
                // console.log(finalizedData)
                // console.log("=======")

            }
            // console.log("finalized2: ", finalizedData)

            // for (let i = 0; i < 6; i++) {
            //     console.log(oldCarInfo[i])
            // }



            // if (finalizedData.name === undefined) {
            //     finalizedData.name = newData.name
            // }

            // if (finalizedData.age === undefined) {
            //     finalizedData.age = newData.age
            // }

            // if (finalizedData.email === undefined) {
            //     finalizedData.email = newData.email
            // }

            // command = `UPDATE ${table} SET  = (?),
            //     model = (?),
            //     WHERE license_plate = (?);`

            command = cc.commandCreator(finalizedData)
            console.log("Received command:", command)

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

        db.con_cars.query(command,(error, results) => {
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