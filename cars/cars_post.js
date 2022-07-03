const db = require('../database/database.js')
const {request} = require("express");
// const carModel = require("car_model.js")
const {Car} = require("./car_model.js");

const createData = async (request, response) => {
    console.log("===========")
    console.log("request.body: ",request.body)

    if (request.body.license_plate !== undefined) {
        // const table = await db.getTable(request, response)
        const table = "table1"
        //console.log("Table: ", table)
        let rb = request.body

        let newData

        if (table === 'table1') {
            // data = {
            //     id: request.body.id,
            //     name: request.body.name,
            //     email: request.body.email,
            //     age: request.body.age
            // }

            newData = new Car(rb.license_plate, rb.brand, rb.model, rb.codename, rb.year, rb.comment)

        // } else if (table === 'table2') {
        //     data = {
        //         id: request.body.id,
        //         brand: request.body.brand,
        //         model: request.body.model,
        //         year: request.body.year
        //     }
        }

        console.log("newData: " , newData)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?)`;

        db.con_cars.query(command, Object.values(newData), (error) => {
            //console.log(command, Object.values(data))
            if (error) {
                response.json({
                    status: "fail",
                    message: error
                })
            } else {
                response.json({
                    status: "success",
                    message: newData
                })
            }
        })
    } else {
        response.json({
            status: "fail",
            message: "http body does not exist"
        })
    }
    //console.log(response)
    console.log("===========")
}

module.exports = {
    createData
}