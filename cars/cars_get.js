const db = require('../database/database.js')

const getDataByID = async (request, response) => {
    console.log("===========")

    // const table = await db.getTable(request)
    const table = "table1"
    console.log("Table: ", table)

    const queryCommand = `SELECT * FROM ${table} WHERE license_plate = '${parseInt(request.params.license_plate)}'`
    console.log(queryCommand)
    db.con_cars.query(queryCommand, (error, results) => {
        console.log(results)
        if (!results[0]) {
            response.json({
                status: "error",
                message: error
            })
        } else {
            response.json({
                status: "success",
                message: results
            })
        }
    })

    console.log("===========")
}

const getData = async (request, response) => {
    console.log("===========")

    // const table = await db.getTable(request)
    const table = "table1"
    console.log("Table: ", table)
    //console.log("nyeh")

    const queryCommand = `SELECT * FROM ${table};`
    console.log(queryCommand)
    db.con_cars.query(queryCommand, (error, results) => {
        if (!results) {
            response.json({
                status: "error",
                message: error.code
            })
        } else {
            response.json({
                status: "success",
                message: results
            })
        }
        //console.log(response.body)
    })
    console.log("===========")
}

module.exports = {
    getData,
    getDataByID
}