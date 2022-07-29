const db = require('../database/database.js')

const getDataByID = async (request, response) => {
    console.log("===========")
    // await db.connect()

    const table = "table1"
    console.log("Table: ", table)

    const queryCommand = `SELECT * FROM ${table} WHERE license_plate = '${parseInt(request.params.license_plate)}'`
    console.log(queryCommand)

    db.con_cars.query(queryCommand, (error, results) => {
        console.log(results)
        if (!results[0]) {
            response.json({
                status: "error",
                message: error,
                data: null
            })
        } else {
            response.json({
                status: "success",
                message: null,
                data: results
            })
        }
    })
    // await db.endConnection();
    console.log("===========")
}

const getData = async (request, response) => {
    console.log("===========")

    const table = "table1"
    console.log("Table: ", table)

    const queryCommand = `SELECT * FROM ${table};`
    console.log(queryCommand)

    // await db.connect()
    db.con_cars.query(queryCommand, (error, results) => {
        if (!results) {
            response.json({
                status: "error",
                message: error.code,
                data: null
            })
        } else {
            response.json({
                status: "success",
                message: null,
                data: results
            })
        }
    })
    // await db.endConnection();
    console.log("===========")
}

module.exports = {
    getData,
    getDataByID
}