const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const {Car} = require("../Model/Car.js");
const carBrands = require("./carBrands");

/*
 * Creates car
 * Can return 4 responses
 * - error - Could not create new brand
 * - error - Error of database connection
 * - error - http body does not exist
 * - success - null
 */
const createData = async (request, response) => {
    // console.log("===========")
    // console.log("request.body: ",request.body)

    // license plate in request body is important
    if (request.body.license_plate !== undefined) {
        const table = "table1"
        const tableBrand = "brands"
        let rb = request.body

        let newData

        let brand_id = 0
        let newBrand = true

        carBrands.brands = await carBrands.queryBrands();

        if (rb.brand !== undefined) {
            for (let value of Object.values(carBrands.brands)) {
                if (rb.brand === value.brand) {
                    brand_id = value.brand_id
                    newBrand = false
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
        } else {
            newBrand = false
            brand_id = 1
        }

        /*
         * Give every value a DEFAULT_VALUE if they are null/""
         */
        for (let key of Object.keys(rb)) {
            if (rb[key] === "" || rb[key] === null) {
                rb[key] = "DEFAULT_VALUE"
            }
        }
        newData = new Car(rb.license_plate, brand_id, rb.model, rb.codename, rb.year, rb.comment, rb.is_new, rb.latitude, rb.longitude)

        // console.log("newData: " , newData)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.pool_cars.query(command, Object.values(newData), (error) => {
            if (error) {
                console.log(error)
                responseCuccli(response, false, error, null, null)
            } else {
                responseCuccli(response, true, null, newData, null)
            }
        })
    } else {
        responseCuccli(response, false, "License plate is not in HTTP request body", null, null)
    }
}

module.exports = {
    createData
}