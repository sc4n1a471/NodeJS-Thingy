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
    console.log(queryCommand)

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, async (error, results) => {
            if (!results) {
                console.log(error)
                console.log("====== createBrand ======")
                return false;
            } else {
                // console.log("====== createBrand ======")
                resolve(true);
            }
        })
    }).catch(() => {
        console.log("reject")
        console.log("====== createBrand ======")
        return false
    })
}

module.exports = {
    brands,
    getBrands,
    // getBrandById,
    queryBrands,
    createBrand
}