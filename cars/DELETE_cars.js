const db = require('../database/database.js')
const responseCuccli = require("../database/response")

/*
 * Deletes car with given license plate
 * Can return 2 responses
 * - error - error
 * - success - Car deleted with license plate '${license_plate}'!
 */
const deleteData = async (request, response) => {
    // console.log("===========")

    const table = "table1"
    // console.log("Table: ", table)

    const license_plate = request.params.license_plate

    const queryCommand = `DELETE FROM ${table} WHERE license_plate = '${license_plate}';`
    // console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (error) {
            console.log(error)
            responseCuccli(response, false, error, null, null)
        } else {
            responseCuccli(response, true, `Car deleted with license plate '${license_plate}'!'`, null, null)
        }
    })
    // console.log("===========")
}

module.exports = {
    deleteData
}