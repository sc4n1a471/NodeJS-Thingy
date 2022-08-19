const db = require("../database/database");
require('iconv-lite').encodingExists('foo')

let brands = null

const getBrands = async (request, response) => {
    // console.log("======= getBrands =======")
    const queryCommand = "SELECT * FROM brands;"
    db.pool_cars.query(queryCommand, (error, results) => {
        if (!results) {
            console.log(error)
            response.json({
                status: "error",
                message: error.code,
                data: null
            })
        } else {
            brands = results
            response.json({
                status: "success",
                message: null,
                data: results
            })
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