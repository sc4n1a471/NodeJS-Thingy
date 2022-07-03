const commandCreator = (data) => {

    console.log("====== commandCreator start ======")

    // nem igazán emlékszem, miért kell ez a hasIt...
    // ha minden false-ra van állítva, akkor tökéletesen műkszik úgy tűnik, sooo ki lehet szedni nagy eséllyel
    let hasIt = {
        brand: false,
        model: false,
        codename: false,
        year: false,
        comment: false
    }

    let set = " SET"

    let where = ` WHERE license_plate = '${data.license_plate}'`

    let command = `UPDATE table1`

    let notHas = []

    if (hasIt.brand) {
        where += ` AND brand = '${data.brand}'`
    } else {
        notHas.push(`brand = '${data.brand}'`)
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

    set += " " + notHas.join(",")
    command += set
    command += where


    //command_old = `UPDATE table SET brand = (?),
    //            model = (?),
    //            year = (?)
    //            WHERE id = (?);`

    console.log(set)
    console.log(command)
    console.log("where:", where)
    console.log("====== commandCreator stop ======")

    return command
}

module.exports = {
    commandCreator
}