const db = require('../database/database.js')

const deleteData = async (request, response) => {
    console.log("===========")

    const table = "table1"
    console.log("Table: ", table)

    const license_plate = request.params.license_plate

    const queryCommand = `DELETE FROM ${table} WHERE license_plate = '${license_plate}';`
    console.log(queryCommand)

    await db.connect()
    db.con_cars.query(queryCommand, (error, results) => {
        if (error) {
            console.log(error)
            response.json({
                status: "error",
                message: error,
                data: null
            })
        } else {
            response.json({
                status: "success",
                message: `Car deleted with license plate '${license_plate}'!'`,
                data: null
            })
        }
    })
    await db.endConnection();
    console.log("===========")
}

module.exports = {
    deleteData
}