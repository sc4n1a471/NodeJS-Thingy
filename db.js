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

const getUserByID = (request, response) => {
    console.log("===========")
    const queryCommand = `SELECT * FROM table1 WHERE id = '${parseInt(request.params.id)}'`
    //console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        //console.log(results)
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
    const data = {
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

const checkUser = async (id) => {
    const queryCommand = `SELECT * FROM table1 WHERE id = '${id}'`
    return new Promise((resolve, reject) => {
        con.query(queryCommand, (error, results) => {
            if (!results[0]) {
                console.log(`No data with id ${id}`)
                reject(`No data with id ${id}`)
            } else {
                console.log(`Success: Data found with id '${id}'`)
                resolve(results[0])
            }
        })
    }).catch(function() {
        console.log("reject")
        return "nope"
    })
}
const updateUser = async (request, response) => {
    console.log("===========")
    const data = await checkUser(parseInt(request.params.id))
    if (data !== "nope") {
        let data2 = {
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

        const command = `UPDATE table1 SET name = '${data2.name}',
        email = '${data2.email}',
        age = '${data2.age}'
        WHERE id = '${data2.id}';`

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
                message: "This user does not exist"
            }
        )
    }

    console.log("===========")
}

const deleteUser = (request, response) => {
    console.log("===========")
    console.log(request.query)
    const queryCommand = `DELETE FROM table1 WHERE id = '${parseInt(request.params.id)}';`
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
                message: `User deleted with id '${parseInt(request.params.id)}'`
            })
        }
    })
    console.log("===========")
}

module.exports = {
    getUsersID: getUserByID,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}