const db = require('../database/database.js')
const cc = require('../commands/commandCreator.js')
const carModel = require('../Model/Car.js')
const {Car} = require("../Model/Car");
const carBrands = require("./carBrands");
const responseCuccli = require("../database/response")
const sqlCommands = require("../commands/sqlCommands.js")

/*
 * Returns the updatable car as object
 * Can return 3 responses
 * - No car with license plate ${license_plate}
 * - No car was found with this license plate
 * - Array of car object
 */
const checkData = async (license_plate, table) => {
    return new Promise((resolve, reject) => {
        db.pool_cars.query(sqlCommands.checkDataCommand(license_plate, table), (error, results) => {
            if (results !== undefined) {
                if (results.affectedRows === 0) {
                    console.log(`No car with license plate ${license_plate}`)
                    reject(`No car with license plate ${license_plate}`)
                } else {
                    resolve(results[0])
                }
            } else {
                console.log(`Result is empty`)
                reject(`Result is empty`)
            }

        })
    }).catch(function() {
        console.log("No car was found with this license plate")
        return "No car was found with this license plate"
    })
}

/*
 * Updates car with new data
 * Can return 3 responses
 * - error - This data does not exist
 * - error - No rows were affected
 * - success - Car was updated successfully
 */
const updateData = async (request, response) => {

    const table = "table1"

    const oldData = await checkData(request.params.license_plate, table)

    if (oldData !== "No car was found with this license plate") {
        let oldCar = new Car(oldData.license_plate, oldData.brand_id, oldData.model, oldData.codename, oldData.year, oldData.comment, oldData.is_new, oldData.brand)

        let finalizedData
        let command
        let rb = request.body
        let rp = request.params

        if (table === 'table1') {

            carBrands.brands = await carBrands.queryBrands();
            let brand_id = 0

            // get brand_id if it is a known brand
            if (rb.brand !== undefined) {
                for (let value of Object.values(carBrands.brands)) {
                    if (rb.brand === value.brand) {
                        brand_id = value.brand_id
                        break;
                    }
                }

                // if the brand is new
                if (brand_id === 0) {
                    let successfullyUploadedNewBrand = await carBrands.createBrand(rb.brand)
                    if (successfullyUploadedNewBrand[0]) {
                        brand_id = successfullyUploadedNewBrand[1]
                    } else {
                        console.log("Failed to create new brand")
                        responseCuccli(response, false, "Could not create new brand", null, null, 500)
                        return
                    }
                }
            }

            // If license_plate is in the body, that means the request wants to update the license_plate
            if (rb.license_plate === undefined) {
                finalizedData = new carModel.Car(
                    rp.license_plate
                )
            } else {
                finalizedData = new carModel.Car(rp.license_plate)
                finalizedData.new_license_plate = rb.license_plate
            }

            /*
             * merges oldCar's and newCar's data into finalizedData
             * if attribute is given in newCar, that means it's a data to be updated
             */
            for (let [key, value] of Object.entries(oldCar)) {
                for (let [newKey, newValue] of Object.entries(rb)) {
                    if (key !== 'license_plate' && key !== '_new_license_plate' && key !== 'brand_id') {
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
            // finalizedData.brand = rb.brand

            // console.log(finalizedData)
            command = cc.commandCreator(finalizedData)
            // console.log("Received command:", command)
        }


        db.pool_cars.query(command,(error, results) => {
            if (error) {
                console.log(error)
                responseCuccli(response, false, error, null, null, 500)
            } else if (results.affectedRows === 0) {
                console.error("No rows were affected")
                responseCuccli(response, false, "No rows were affected", finalizedData, null, 418)
            } else {
                // console.log("Results: " + JSON.stringify(results))
                responseCuccli(response, true, 'Car was updated successfully', finalizedData, null, 201)
            }
        })
    } else {
        console.log("This data does not exist")
        responseCuccli(response, false, "This data does not exist", null, null, 404)
    }
}

module.exports = {
    updateData
}