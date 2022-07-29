const db = require('../database/database.js')
const {request} = require("express");
const {Car} = require("./car_model.js");

const createData = async (request, response) => {
    console.log("===========")
    console.log("request.body: ",request.body)

    if (request.body.license_plate !== undefined) {
        const table = "table1"
        let rb = request.body

        let newData

        if (table === 'table1') {

            newData = new Car(rb.license_plate, rb.brand, rb.model, rb.codename, rb.year, rb.comment)
        }

        console.log("newData: " , newData)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?)`;

        await db.connect()
        db.con_cars.query(command, Object.values(newData), (error) => {
            if (error) {
                response.json({
                    status: "fail",
                    message: error,
                    data: null
                })
            } else {
                response.json({
                    status: "success",
                    message: null,
                    data: newData
                })
            }
        })
    } else {
        response.json({
            status: "fail",
            message: "http body does not exist",
            data: null
        })
    }
    await db.endConnection();
    console.log("===========")
}

module.exports = {
    createData
}