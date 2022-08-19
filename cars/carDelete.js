const db = require('../database/database.js')
const responseCuccli = require("../database/response")

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
            responseCuccli(response, "error", error, null, null)
        } else {
            responseCuccli(response, "success", `Car deleted with license plate '${license_plate}'!'`, null, null)
        }
    })
    // console.log("===========")
}

module.exports = {
    deleteData
}