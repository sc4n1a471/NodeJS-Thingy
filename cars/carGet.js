const db = require('../database/database.js')
const responseCuccli = require("../database/response")
const table1 = "table1"
const tableBrands = "brands"

const getData = async (request, response) => {
    // console.log("===========")

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
    // console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log(error)
            responseCuccli(response, "error", error.code, null, null)
        } else {
            responseCuccli(response, "success", null, results, null)
        }
    })
    // console.log("===========")
}

const getDataByID = async (request, response) => {
    // console.log("===========")

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
    // console.log(queryCommand)

    db.pool_cars.query(queryCommand, (error, results) => {
        if (results !== undefined) {
            if (!results[0]) {
                console.log(error)
                responseCuccli(response, "error", error, null, null)
            } else {
                responseCuccli(response, "success", null, results, null)
            }
        } else {
            responseCuccli(response, "error", "results is undefined", null, null)
        }
    })
    // console.log("===========")
}

module.exports = {
    getData,
    getDataByID
}