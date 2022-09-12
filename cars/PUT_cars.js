const db = require('../database/database.js')
const cc = require('../commandCreator.js')
const carModel = require('../Model/Car.js')
const {Car} = require("../Model/Car");
const carBrands = require("./carBrands");
const responseCuccli = require("../database/response")
const createLocation = require("../carLocation/locationPOST");
const updateLocation = require("../carLocation/locationPUT");

/*
 * Returns the updatable car as object
 * Can return 3 responses
 * - No car with license plate ${license_plate}
 * - No car was found with this license plate
 * - Array of car object
 */
const checkData = async (license_plate, table) => {
    const queryCommand = `
        SELECT 
            ${table}.license_plate, 
            ${table}.brand_id,
            brands.brand, 
            ${table}.model, 
            ${table}.codename, 
            ${table}.year, 
            ${table}.comment, 
            ${table}.is_new,
            locations.latitude,
            locations.longitude
        FROM 
            ${table}
        INNER JOIN 
            brands 
        ON 
            ${table}.brand_id = brands.brand_id
        INNER JOIN
            locations
        ON
            ${table}.location_id = locations.location_id
        WHERE 
            ${table}.license_plate = '${license_plate}'
        ORDER BY 
            license_plate;`

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, (error, results) => {
            if (!results[0]) {
                reject(`No car with license plate ${license_plate}`)
            } else {
                resolve(results[0])
            }
        })
    }).catch(function() {
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
                        responseCuccli(response, false, "Could not create new brand", null, null)
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

            // Update location
            let successfullyUpdatedLocation = await updateLocation(rp.license_plate, rb.latitude, rb.longitude)
            if (successfullyUpdatedLocation) {
                // location_id = successfullyUpdatedLocation
            } else {
                console.log("Failed to update location")
                responseCuccli(response, false, "Could not update location", null, null)
                return
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
                responseCuccli(response, false, error, null, null)
            } else if (results.affectedRows === 0) {
                console.error("No rows were affected")
                responseCuccli(response, false, "No rows were affected", finalizedData, null)
            } else {
                // console.log("Results: " + JSON.stringify(results))
                responseCuccli(response, true, 'Car was updated successfully', finalizedData, null)
            }
        })
    } else {
        responseCuccli(response, false, "This data does not exist", null, null)
    }
}

module.exports = {
    updateData
}