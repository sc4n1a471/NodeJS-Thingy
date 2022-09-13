const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const table1 = "table1"
const tableBrands = "brands"

/*
 * Returns all cars as HTTP response
 * Can return 2 responses
 * - error - error.code
 * - success - There you go
 */
const getData = async (request, response) => {

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new,
            ${table1}.latitude,
            ${table1}.longitude
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        ORDER BY 
            license_plate;`

    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log("error:", error)
            responseCuccli(response, false, error.code, null, null)
        } else {
            responseCuccli(response, true, "There you go", results, null)
        }
    })
}

/*
 * Returns car with given license plate as HTTP response
 * Can return 3 responses
 * - error - This car does not exist
 * - error - results is undefined
 * - success - There you go
 */
const getDataByID = async (request, response) => {

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new,
            ${table1}.latitude,
            ${table1}.longitude
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        WHERE 
            ${table1}.license_plate = '${(request.params.license_plate)}'
        ORDER BY 
            license_plate;`

    db.pool_cars.query(queryCommand, (error, results) => {
        if (results !== undefined) {
            if (results[0] === undefined) {
                console.log("error:", `Car does not exist with license plate ${request.params.license_plate}`)
                responseCuccli(response, false, `Car does not exist with license plate ${request.params.license_plate}`, null, null)
            } else {
                responseCuccli(response, true, "There you go", results, null)
            }
        } else {
            responseCuccli(response, false, "results is undefined", null, null)
        }
    })
}

module.exports = {
    getData,
    getDataByID
}