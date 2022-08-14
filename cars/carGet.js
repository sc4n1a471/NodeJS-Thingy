const db = require('../database/database.js')
const table1 = "table1"
const tableBrands = "brands"

const getData = async (request, response) => {
    console.log("===========")

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new 
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        ORDER BY 
            license_plate;`
    console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log(error)
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
    console.log("===========")
}

const getDataByID = async (request, response) => {
    console.log("===========")

    const queryCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new 
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        WHERE 
            ${table1}.license_plate = '${(request.params.license_plate)}'
        ORDER BY 
            license_plate;`
    console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results[0]) {
            console.log(error)
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
    console.log("===========")
}

module.exports = {
    getData,
    getDataByID
}