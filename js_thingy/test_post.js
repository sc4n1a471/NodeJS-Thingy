const db = require('./cars_db.js')

const createData = async (request, response) => {
    console.log("===========")
    console.log("request.body: ",request.body)

    if (request.body.id !== undefined) {
        const table = await db.getTable(request, response)
        //console.log("Table: ", table)

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

        console.log("data: " ,data)

        let command = `INSERT INTO ${table} VALUES (?, ?, ?, ?)`;

        db.con.query(command, Object.values(data), (error) => {
            //console.log(command, Object.values(data))
            if (error) {
                response.json({
                    status: "fail",
                    message: error
                })
            } else {
                response.json({
                    status: "success",
                    message: data
                })
            }
        })
    } else {
        response.json({
            status: "fail",
            message: "http body does not exist"
        })
    }
    //console.log(response)
    console.log("===========")
}

module.exports = {
    createData
}