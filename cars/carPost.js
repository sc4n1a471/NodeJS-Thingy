const db = require('../database/database.js')
const {Car} = require("./carModel.js");
const carBrands = require("./carBrands");

const createData = async (request, response) => {
    console.log("===========")
    console.log("request.body: ",request.body)

    if (request.body.license_plate !== undefined) {
        const table = "table1"
        const tableBrand = "brands"
        let rb = request.body

        let newData

        carBrands.brands = await carBrands.queryBrands();

        let brand_id
        let newBrand = true

        if (rb.brand !== undefined) {
            for (let value of Object.values(carBrands.brands)) {
                if (rb.brand === value.brand) {
                    brand_id = value.brand_id
                    newBrand = false
                    break;
                }
            }
        } else {
            newBrand = false
            brand_id = 1
        }

        if (newBrand) {
            let successfullyCreatedBrand = await carBrands.createBrand(rb.brand)
            if (!successfullyCreatedBrand) {
                console.log("Failed to create new brand")
                response.json({
                    status: "fail",
                    message: "Could not create new brand",
                    data: null
                })
                return
            } else {
                carBrands.brands = await carBrands.queryBrands();
                console.log("Brands after creating new one: ", carBrands.brands)
                for (let value of Object.values(carBrands.brands)) {
                    if (rb.brand === value.brand) {
                        brand_id = value.brand_id
                        break;
                    }
                }
            }
        }

        for (let key of Object.keys(rb)) {
            if (rb[key] === "" || rb[key] === null) {
                rb[key] = "DEFAULT_VALUE"
            }
        }
        newData = new Car(rb.license_plate, brand_id, rb.model, rb.codename, rb.year, rb.comment, rb.is_new)

        console.log("newData: " , newData)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.pool_cars.query(command, Object.values(newData), (error) => {
            if (error) {
                console.log(error)
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
    console.log("===========")
}

module.exports = {
    createData
}