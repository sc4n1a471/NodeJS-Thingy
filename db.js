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

const getTable = (request) => {
    console.log("====== getTable ======")
    console.log("Query: ",request.query)
    if (request.query !== undefined) {
        console.log("Query = undefined?: ", request.query.table === undefined)
    }
    if (request.query.table === undefined) {
        console.log(request.body)
        if (request.body.name !== undefined) {
            console.log("found: table1")
            console.log("====== getTable ======")
            return "table1"
        } else if (request.body.brand !== undefined) {
            console.log("found: table2")
            console.log("====== getTable ======")
            return "table2"
        }
    } else {
        console.log("Table: ", request.query.table)
        let table = request.query.table
        // if (table === undefined) {
        //     console.log("Táblacsere")
        //     table = 'table1'
        // }
        return table
    }
    console.log("====== getTable ======")
}

const getDataByID = (request, response) => {
    console.log("===========")

    const table = getTable(request)
    console.log("Table: ", table)

    const queryCommand = `SELECT * FROM ${table} WHERE id = '${parseInt(request.params.id)}'`
    console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        //console.log(results)
        if (!results[0]) {
            response.json({
                status: "error",
                message: error
            })
        } else {
            response.json(results[0])
        }
    })

    console.log("===========")
}

const getData = (request, response) => {
    console.log("===========")

    const table = getTable(request)
    console.log("Table: ", table)

    const queryCommand = `SELECT * FROM ${table};`
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

const createData = (request, response) => {
    console.log("===========")

    const table = getTable(request, response)
    console.log("Table: ", table)

    let data

    if (table === 'table1') {
        data = {
            id: request.body.id,
            name: request.body.name,
            email: request.body.email,
            age: request.body.age
        }
    } else if (table === 'table2') {
        data = {
            id: request.body.id,
            brand: request.body.brand,
            model: request.body.model,
            year: request.body.year
        }
    }

    console.log(data)

    let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?)`;

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

const checkData = async (id, table) => {
    console.log("====== checkData ======")
    // const table = getTable(request)
    console.log("table passed to checkData: ", table)

    const queryCommand = `SELECT * FROM ${table} WHERE id = '${id}'`
    return new Promise((resolve, reject) => {
        con.query(queryCommand, (error, results) => {
            if (!results[0]) {
                console.log(`No data with id ${id}`)
                reject(`No data with id ${id}`)
            } else {
                console.log(`Success: Data found with id '${id}'`)
                console.log("====== checkData ======")
                resolve(results[0])
            }
        })
    }).catch(function() {
        console.log("reject")
        console.log("====== checkData ======")
        return "nope"
    })
}
const updateData = async (request, response) => {
    console.log("=========== updateData ===========")

    const table = getTable(request)
    console.log("Table I got: ", table)

    const data = await checkData(parseInt(request.params.id), table)
    if (data !== "nope") {
        let data2
        let command

        if (table === 'table1') {
            console.log("Applied schema is for: table1")
            data2 = {
                id: parseInt(request.params.id),
                name: request.body.name,
                email: request.body.email,
                age: request.body.age
            }
            if (data2.name === undefined) {
                data2.name = data.name
            }
            if (data2.age === undefined) {
                data2.age = data.age
            }
            if (data2.email === undefined) {
                data2.email = data.email
            }

            command = `UPDATE ${table} SET name = '${data2.name}',
                email = '${data2.email}',
                age = '${data2.age}'
                WHERE id = '${data2.id}';`
        } else if (table === 'table2') {
            console.log("Applied schema is for: table2")
            data2 = {
                id: parseInt(request.params.id),
                brand: request.body.brand,
                model: request.body.model,
                year: request.body.year
            }
            command = `UPDATE ${table} SET brand = '${data2.brand}',
                model = '${data2.model}',
                year = '${data2.year}'
                WHERE id = '${data2.id}';`
        }

        console.log("Created command: ", command)

        con.query(command, (error, results) => {
            if (error) {
                response.json(
                    {
                        status: "error",
                        message: error
                    }
                )
            } else {
                console.log("Results: " + JSON.stringify(results))
                response.json(
                    {
                        status: "success",
                        message: data2
                    }
                )
            }
        })
    } else {
        response.json(
            {
                status: "error",
                message: "This data does not exist"
            }
        )
    }

    console.log("=========== updateData ===========")
}

const deleteData = (request, response) => {
    console.log("===========")

    const table = getTable(request)
    console.log("Table: ", table)

    const id = parseInt(request.params.id)

    const queryCommand = `DELETE FROM ${table} WHERE id = '${id}';`
    console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        if (error) {
            response.json({
                status: "error",
                message: error
            })
        } else {
            response.json({
                status: "success",
                message: `Data deleted with id '${id}' from table '${table}'`
            })
        }
    })
    console.log("===========")
}

module.exports = {
    getDataByID,
    getData,
    createData,
    updateData,
    deleteData
}