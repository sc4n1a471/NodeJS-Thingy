const db = require('../database/database.js')
const cc = require('../commandCreator.js')
const carModel = require('./carModel.js')
const {Car} = require("./carModel");
const carBrands = require("./carBrands");
const responseCuccli = require("../database/response")

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
        return "No car was found with this license plate"
    })
}
const updateData = async (request, response) => {
    // console.log("=========== updateData ===========")

    const table = "table1"
    // console.log("Table I got: ", table)

    const oldData = await checkData(request.params.license_plate, table)
    // console.log(oldData)

    if (oldData !== "No car was found with this license plate") {
        let oldCar = new Car(oldData.license_plate, oldData.brand_id, oldData.model, oldData.codename, oldData.year, oldData.comment, oldData.is_new, oldData.brand)

        let finalizedData
        let command
        let rb = request.body
        let rp = request.params
        // console.log("request params:", rp)
        // console.log("request body:", rb)

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

            // If license_plate is in the body, that means the request wants to update the license_plate
            if (rb.license_plate === undefined) {
                finalizedData = new carModel.Car(
                    rp.license_plate
                )
            } else {
                finalizedData = new carModel.Car(
                    rp.license_plate
                )
                // console.log(finalizedData)
                // console.log("New license plate:", rb.license_plate)
                finalizedData.new_license_plate = rb.license_plate
                // console.log(finalizedData)
            }

            // console.log("oldCar:", oldCar)
            // console.log("rb:", rb)
            for (let [key, value] of Object.entries(oldCar)) {
                for (let [newKey, newValue] of Object.entries(rb)) {
                    if (key !== 'license_plate' && key !== '_new_license_plate') {
                        if (key === newKey) {
                            finalizedData[key] = newValue;
                            break;
                        } else {
                            finalizedData[key] = value;
                        }
                    }
                }
            }

            finalizedData.brand_id = brand_id

            // console.log(finalizedData)
            command = cc.commandCreator(finalizedData)
            // console.log("Received command:", command)

        }

        // console.log("newCar: ", finalizedData)

        db.pool_cars.query(command,(error, results) => {
            // console.log(results)
            if (error) {
                console.log(error)
                responseCuccli(response, "error", error, null, null)
            } else if (results.affectedRows === 0) {
                console.error("No rows were affected")
                responseCuccli(response, "error", "No rows were affected", null, null)
            } else {
                // console.log("Results: " + JSON.stringify(results))
                responseCuccli(response, "success", 'Car was updated successfully', null, null)
            }
        })
    } else {
        // console.error("This data does not exist")
        responseCuccli(response, "error", "This data does not exist", null, null)
    }
    // console.log("=========== updateData ===========")
}

module.exports = {
    updateData
}