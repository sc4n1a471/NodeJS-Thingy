const db = require("../database/database");
const responseCuccli = require("../database/response")
const sqlCommands = require("../commands/sqlCommands.js")

let brands = null

/*
 * Returns brands (brand_id, brand) as HTTP response
 * Can return 2 responses
 * - error - error.code
 * - success - null
 */
const getBrands = async (request, response) => {
    db.pool_cars.query(sqlCommands.getBrandsCommand, (error, results) => {
        if (!results) {
            console.log(error)
            responseCuccli(response, false, error.code, null, null, 500)
        } else {
            brands = results
            responseCuccli(response, true, null, null, results)
        }
    })
}

// const getBrandById = async (request, response) => {
//     // console.log("======= getBrands =======")
//     const queryCommand = `SELECT * FROM brands WHERE brand = '${request.params.brand}';`
//     db.pool_cars.query(queryCommand, (error, results) => {
//         if (!results) {
//             console.log(error)
//             responseCuccli(response, "error", error.code, null, null)
//         } else {
//             responseCuccli(response, "success", null, null, results)
//         }
//     })
//     // console.log("======= getBrands =======")
// }

/*
 * Returns brands (brand_id, brand) as object
 * Can return 2 responses
 * - error - "nope"
 * - success - object of brands(results)
 */
const queryBrands = async () => {
    return new Promise((resolve, reject) => {
        db.pool_cars.query(sqlCommands.getBrandsCommand, (error, results) => {
            if (!results) {
                console.log(error)
                reject("!results is true")
            } else {
                resolve(results)
            }
        })
    }).catch(function() {
        console.log("reject")
        return "nope"
    })
}

/*
 * Creates new brand
 * Can return 2 responses
 * - reject - There are no affected rows
 * - resolve - [true, results.insertId (newly inserted brand's brand_id)]
 * - catch - [false]
 */
const createBrand = async (brand) => {
    return new Promise((resolve, reject) => {
        db.pool_cars.query(sqlCommands.createBrandCommand(brand), async (error, results) => {
            if (results !== undefined) {
                if (results.affectedRows === 0) {
                    console.log(error)
                    reject("There are no affected rows");
                } else {
                    resolve([true, results.insertId]);
                }
            } else {
                reject("'Results' is undefined")
            }
        })
    }).catch(() => {
        console.log("reject")
        return [false]
    })
}
const createBrandTest = async (request, response) => {
    const successfullyUploadedNewBrand = await createBrand(request.body.brand)
    if (successfullyUploadedNewBrand[0]) {
        response.json({
            success: true,
            brand_id: successfullyUploadedNewBrand[1]
        })
    } else {
        response.json({
            success: false,
            brand_id: successfullyUploadedNewBrand[1]
        })
    }
}

/*
 * Deletes brand with given brand_id in request.params
 * Can return 2 responses
 * - error - false, error
 * - success - true, Brand was deleted successfully
 */
const deleteBrand = async (request, response) => {
    db.pool_cars.query(sqlCommands.deleteBrandCommand(request.params.brand_id), async (error, results) => {
        if (results.affectedRows === 0) {
            console.log(error)
            responseCuccli(response, false, error, null, null, 500)
        } else {
            responseCuccli(response, true, "Brand was deleted successfully", null, null)
        }
    })
}

module.exports = {
    brands,
    getBrands,
    // getBrandById,
    queryBrands,
    createBrand,
    deleteBrand,
    createBrandTest
}