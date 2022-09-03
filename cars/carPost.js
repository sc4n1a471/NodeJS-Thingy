const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const {Car} = require("./carModel.js");
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

        carBrands.brands = await carBrands.queryBrands();

        let brand_id
        let newBrand = true

        /*
         * if brand is in request body => not unknown car
         */
        if (rb.brand !== undefined) {
            for (let value of Object.values(carBrands.brands)) {
                if (rb.brand === value.brand) {
                    brand_id = value.brand_id
                    newBrand = false
                    break;
                }
                // new brand
            }
        } else {
            newBrand = false
            brand_id = 1
        }

        if (newBrand) {
            let successfullyCreatedBrand = await carBrands.createBrand(rb.brand)
            if (!successfullyCreatedBrand[0]) {
                console.log("Failed to create new brand")
                responseCuccli(response, false, "Could not create new brand", null, null)
                return
            } else {
                // carBrands.brands = await carBrands.queryBrands();
                // console.log("Brands after creating new one: ", carBrands.brands)

                // TODO: Figure out where it gets the ID of the new brand
                for (let value of Object.values(carBrands.brands)) {
                    if (rb.brand === value.brand) {
                        brand_id = value.brand_id
                        break;
                    }
                }
            }
        }

        /*
         * Give every value a DEFAULT_VALUE if they are null/""
         */
        for (let key of Object.keys(rb)) {
            if (rb[key] === "" || rb[key] === null) {
                rb[key] = "DEFAULT_VALUE"
            }
        }
        newData = new Car(rb.license_plate, brand_id, rb.model, rb.codename, rb.year, rb.comment, rb.is_new)

        // console.log("newData: " , newData)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?)`;

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
    // console.log("===========")
}

module.exports = {
    createData
}