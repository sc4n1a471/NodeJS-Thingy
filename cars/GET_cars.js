const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const sqlCommands = require("../commands/sqlCommands.js")

/*
 * Returns all cars as HTTP response
 * Can return 2 responses
 * - error - error.code
 * - success - There you go
 */
const getData = async (request, response) => {
    db.pool_cars.query(sqlCommands.getDataCommand, (error, results) => {
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
    db.pool_cars.query(sqlCommands.getDataByIDCommand(request), (error, results) => {
        if (results !== undefined) {
            if (results.affectedRows === 0) {
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