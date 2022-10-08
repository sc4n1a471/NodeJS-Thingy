const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const sqlCommands = require("../commands/sqlCommands.js")

/*
 * Deletes car with given license plate
 * Can return 2 responses
 * - error - error
 * - success - Car deleted with license plate '${license_plate}'!
 */
const deleteData = async (request, response) => {
    // console.log("===========")

    const license_plate = request.params.license_plate

    db.pool_cars.query(sqlCommands.deleteDataCommand(license_plate), (error, results) => {
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