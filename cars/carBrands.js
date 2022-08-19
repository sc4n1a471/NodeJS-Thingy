const db = require("../database/database");
const responseCuccli = require("../database/response")

let brands = null

const getBrands = async (request, response) => {
    // console.log("======= getBrands =======")
    const queryCommand = "SELECT * FROM brands;"
    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log(error)
            responseCuccli(response, "error", error.code, null, null)
        } else {
            brands = results
            responseCuccli(response, "success", null, null, results)
        }
    })
    // console.log("======= getBrands =======")
}

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
        console.log("====== queryBrands ======")
        return "nope"
    })
}

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
    queryBrands,
    createBrand
}