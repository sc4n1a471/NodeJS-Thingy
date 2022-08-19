const db = require('../database/database.js')
const cc = require('../commandCreator.js')
const carModel = require('./carModel.js')
const {Car} = require("./carModel");
const carBrands = require("./carBrands");

const checkData = async (license_plate, table) => {
    // console.log("====== checkData ======")
    // console.log("table passed to checkData: ", table)
    const queryCommand = `SELECT * FROM ${table} WHERE license_plate = '${license_plate}'`

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, (error, results) => {
            if (!results[0]) {
                // console.log(`No car with license plate ${license_plate}`)
                reject(`No car with license plate ${license_plate}`)
            } else {
                // console.log(`Success: Car found with license plate '${license_plate}'`)
                // console.log("====== checkData ======")
                resolve(results[0])
            }
        })
    }).catch(function() {
        // console.log("reject")
        // console.log("====== checkData ======")
        return "nope"
    })
}
const updateData = async (request, response) => {
    // console.log("=========== updateData ===========")

    const table = "table1"
    // console.log("Table I got: ", table)

    const oldData = await checkData(request.params.license_plate, table)

    if (oldData !== "nope") {
        let oldCar = new Car(oldData.license_plate, oldData.brand_id, oldData.model, oldData.codename, oldData.year, oldData.comment, oldData.is_new, oldData.brand)

        let finalizedData
        let command
        let rb = request.body

        if (table === 'table1') {
            // console.log("Applied schema is for: table1")

            carBrands.brands = await carBrands.queryBrands();
            let brand_id = oldCar.brand_id
            if (rb.brand !== undefined) {
                // console.log("New brand is in body")
                for (let value of Object.values(carBrands.brands)) {
                    if (rb.brand === value.brand) {
                        brand_id = value.brand_id
                        break;
                    }
                }
            }

            finalizedData = new carModel.Car(
                request.params.license_plate
            )

            for (let [key, value] of Object.entries(oldCar)) {
                for (let [newKey, newValue] of Object.entries(rb)) {
                    if (key === newKey) {
                        finalizedData[key] = newValue;
                        break;
                    } else {
                        finalizedData[key] = value;
                    }
                }
            }

            finalizedData.brand_id = brand_id

            command = cc.commandCreator(finalizedData)
            // console.log("Received command:", command)

        }

        // console.log("newCar: ", finalizedData)

        db.pool_cars.query(command,(error, results) => {
            if (error) {
                console.log(error)
                response.json(
                    {
                        status: "error",
                        message: error,
                        data: null
                    }
                )
            } else {
                // console.log("Results: " + JSON.stringify(results))
                response.json(
                    {
                        status: "success",
                        message: null,
                        data: finalizedData
                    }
                )
            }
        })
    } else {
        response.json(
            {
                status: "error",
                message: "This data does not exist",
                data: null
            }
        )
    }
    // console.log("=========== updateData ===========")
}

module.exports = {
    updateData
}