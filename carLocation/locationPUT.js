const db = require("../database/database");

/*
 * Updates existing location
 * Can return 3 responses
 * - reject - There are no affected rows
 * - resolve - true
 * - catch - false
 */
const updateLocation = async (license_plate, latitude, longitude) => {
    const queryCommand = `
        UPDATE 
            locations 
        SET 
            latitude=${latitude}, 
            longitude=${longitude} 
        WHERE 
            locations.location_id=
                (SELECT 
                    table1.location_id 
                 FROM 
                    table1 
                 WHERE 
                    table1.license_plate='${license_plate}')`;

    return new Promise((resolve, reject) => {
        db.pool_cars.query(queryCommand, async (error, results) => {
            if (results !== undefined) {
                if (results.affectedRows === 0) {
                    console.log(error)
                    reject("There are no affected rows");
                } else {
                    resolve(true);
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

module.exports = updateLocation