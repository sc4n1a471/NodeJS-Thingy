const db = require('./db.js')

const deleteData = async (request, response) => {
    console.log("===========")

    const table = await db.getTable(request)
    console.log("Table: ", table)

    const id = parseInt(request.params.id)

    const queryCommand = `DELETE FROM ${table} WHERE id = '${id}';`
    console.log(queryCommand)
    db.con.query(queryCommand, (error, results) => {
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
    deleteData
}