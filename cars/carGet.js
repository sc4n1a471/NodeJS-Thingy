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
    // console.log("===========")

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new 
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        ORDER BY 
            license_plate;`
    // console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log("error:", error)
            responseCuccli(response, false, error.code, null, null)
        } else {
            responseCuccli(response, true, "There you go", results, null)
        }
    })
    // console.log("===========")
}

/*
 * Returns car with given license plate as HTTP response
 * Can return 3 responses
 * - error - This car does not exist
 * - error - results is undefined
 * - success - There you go
 */
const getDataByID = async (request, response) => {
    // console.log("===========")

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new 
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
    // console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (results !== undefined) {
            // console.log(results)
            // console.log(results[0] === undefined)
            if (results[0] === undefined) {
                console.log("error:", "This car does not exist")
                responseCuccli(response, false, "This car does not exist", null, null)
            } else {
                responseCuccli(response, true, "There you go", results, null)
            }
        } else {
            responseCuccli(response, false, "results is undefined", null, null)
        }
    })
    // console.log("===========")
}

module.exports = {
    getData,
    getDataByID
}