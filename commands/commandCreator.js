const commandCreator = (data) => {

    // console.log("====== commandCreator start ======")

    let hasIt = {
        new_license_plate: false,
        brand: false,
        brand_id: false,
        model: false,
        codename: false,
        year: false,
        comment: false,
        latitude: false,
        longitude: false
    }

    let set = " SET"

    let where = ` WHERE license_plate = '${data.license_plate}'`

    let command = `UPDATE table1`

    let notHas = []

    if (hasIt.new_license_plate) {
        where += ` AND license_plate = '${data.license_plate}'`
    } else {
        // console.log("commandCreator data:", data)
        notHas.push(`license_plate = '${data._new_license_plate}'`)
    }

    if (hasIt.brand_id) {
        where += ` AND brand_id = '${data.brand_id}'`
    } else {
        notHas.push(`brand_id = '${data.brand_id}'`)
    }

    if (hasIt.model) {
        where += ` AND model = '${data.model}'`
    } else {
        notHas.push(`model = '${data.model}'`)
    }

    if (hasIt.codename) {
        where += ` AND codename = '${data.codename}'`
    } else {
        notHas.push(`codename = '${data.codename}'`)
    }

    if (hasIt.year) {
        where += ` AND year = ${data.year}`
    } else {
        notHas.push(`year = ${data.year}`)
    }

    if (hasIt.comment) {
        where += ` AND comment = '${data.comment}'`
    } else {
        notHas.push(`comment = '${data.comment}'`)
    }

    if (hasIt.is_new) {
        where += ` AND is_new = '${data.is_new}'`
    } else {
        notHas.push(`is_new = '${data.is_new}'`)
    }

    if (hasIt.latitude) {
        where += ` AND latitude = '${data.latitude}'`
    } else {
        notHas.push(`latitude = '${data.latitude}'`)
    }

    if (hasIt.longitude) {
        where += ` AND longitude = '${data.longitude}'`
    } else {
        notHas.push(`longitude = '${data.longitude}'`)
    }

    set += " " + notHas.join(",")
    command += set
    command += where


    //command_old = `UPDATE table SET brand = (?),
    //            model = (?),
    //            year = (?)
    //            WHERE id = (?);`

    // console.log(set)
    // console.log(command)
    // console.log("where:", where)
    // console.log("====== commandCreator stop ======")

    return command
}

module.exports = {
    commandCreator
}