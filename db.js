const mysql = require("mysql2");
const {request, response} = require("express");
const con = mysql.createConnection({
    host: "192.168.5.172",
    user: "mysql_user",
    password: "123456789A",
    database: "js_thingy"
});

con.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to MySQL")
    }
})

const getUsersID = (request, response) => {
    console.log("===========")
    //console.log(request)
    const queryCommand = `SELECT * FROM table1 WHERE id = '${request.params.id}'`
    console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        console.log(results)
        if (!results[0]) {
            response.json({
                status: "Nope"
            })
        } else {
            response.json(results[0])
        }
    })
    console.log("===========")
}

const getUsers = (request, response) => {
    console.log("===========")
    //console.log(dbName)
    //const queryCommand = `SELECT * FROM ${dbName}`
    const queryCommand = "SELECT * FROM table1;"
    console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        console.log(results)
        if (!results) {
            response.json({
                status: "Nope"
            })
        } else {
            response.json(results)
        }
    })
    console.log("===========")
}

const createUser = (request, response) => {
    console.log("===========")
    let data = {
        id: request.body.id,
        name: request.body.name,
        email: request.body.email,
        age: request.body.age
    }
    console.log(data)

    let command = "INSERT INTO table1 VALUES (?, ?, ?, ?)";

    con.query(command, Object.values(data), (error) => {
        if (error) {
            response.json({
                status: "fail",
                message: error.code
            })
        } else {
            response.json({
                status: "success",
                message: data
            })
        }
    })
    console.log("===========")
}

module.exports = {
    getUsersID,
    getUsers,
    createUser,
    // getDB
}