const db = require("../database/database");
const responseCuccli = require("../database/response")

let brands = null

/*
 * Returns brands (brand_id, brand) as HTTP response
 * Can return 2 responses
 * - error - error.code
 * - success - null
 */
const getBrands = async (request, response) => {
    // console.log("======= getBrands =======")
    const queryCommand = "SELECT * FROM brands;"
    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log(error)
            responseCuccli(response, false, error.code, null, null)
        } else {
            brands = results
            responseCuccli(response, true, null, null, results)
        }
    })
    // console.log("======= getBrands =======")
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
    // console.log("====== queryBrands ======")
    const queryCommand = "SELECT * FROM brands;"

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, (error, results) => {
            if (!results) {
                console.log(error)
                reject("!results is true")
            } else {
                resolve(results)
                // console.log("Result: ", results)
                // console.log("====== queryBrands ======")
            }
        })
    }).catch(function() {
        console.log("reject")
        // console.log("====== queryBrands ======")
        return "nope"
    })
}

/*
 * Creates new brand
 * Can return 2 responses
 * - error - false
 * - catch - false
 * - success - true
 */
const createBrand = async (brand) => {
    // console.log("====== createBrand ======")
    const queryCommand = `INSERT INTO brands (brand) VALUES ('${brand}')`;
    // console.log(queryCommand)

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, async (error, results) => {
            if (results.affectedRows == 0) {
                console.log(error)
                // console.log("====== createBrand ======")
                reject("There are no affected rows");
            } else {
                // console.log("====== createBrand ======")
                resolve([true, results.insertId]);
            }
        })
    }).catch(() => {
        console.log("reject")
        // console.log("====== createBrand ======")
        return [false]
    })
}
const createBrandTest = async (request, response) => {
    const he = await createBrand(request.body.brand)
    if (he[0]) {
        response.json({
            success: true,
            brand_id: he[1]
        })
    } else {
        response.json({
            success: false,
            brand_id: he[1]
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
    let queryCommand = `DELETE FROM brands WHERE brand_id = '${request.params.brand_id}';`

    db.pool_cars.query(queryCommand, async (error, results) => {
        if (results.affectedRows === 0) {
            console.log(error)
            responseCuccli(response, false, error, null, null)
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