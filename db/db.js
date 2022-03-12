const mysql = require("mysql2");
const {request, response} = require("express");
const con = mysql.createConnection({
    host: "192.168.5.172",
    user: "mysql_user",
    password: "123456789A",
    database: "js_thingy"
});
const cc = require('../commandCreator.js')

con.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to MySQL")
    }
})

const getTable = async (request) => {
    console.log("====== getTable start ======")
    console.log("Query: ",request.query)
    return new Promise((resolve, reject) => {
        if (request.query !== undefined) {
            console.log("Query = undefined?: ", request.query.table === undefined)
        }
        if (request.query.table === undefined) {
            console.log("Body: ", request.body)
            if (request.body.name !== undefined || request.body.email !== undefined || request.body.age !== undefined) {
                console.log("found: table1")
                console.log("====== getTable stop ======")
                resolve("table1")
            } else if (request.body.brand !== undefined || request.body.model !== undefined || request.body.year !== undefined) {
                console.log("found: table2")
                console.log("====== getTable stop ======")
                resolve("table2")
            }
        } else {
            console.log("Table: ", request.query.table)
            let table = request.query.table
            console.log("====== getTable stop ======")
            resolve(table)
        }
        resolve("nyeh")
    }).catch(function() {
        console.log("reject")
        console.log("====== getTable stop ======")
        return "hellno"
    })
}

module.exports = {
    getTable,
    con,
    cc
}