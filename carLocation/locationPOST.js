const db = require("../database/database");

/*
 * Creates new location
 * Can return 3 responses
 * - reject - There are no affected rows
 * - resolve - [true, results.insertId (newly inserted location's location_od)]
 * - catch - [false]
 */
const createLocation = async (latitude, longitude) => {
    const queryCommand = `INSERT INTO locations(latitude, longitude) VALUES (${latitude}, ${longitude})`;

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, async (error, results) => {
            if (results !== undefined) {
                if (results.affectedRows === 0) {
                    console.log(error)
                    reject("There are no affected rows");
                } else {
                    resolve([true, results.insertId]);
                }
            } else {
                reject("'Results' is undefined")
            }
        })
    }).catch(() => {
        console.log("reject")
        return [false]
    })
}

module.exports = createLocation