const commandCreator = (data, data2) => {

    console.log("====== commandCreator start ======")
    let hasIt = {
        brand: false,
        model: false,
        year: false
    }
    console.log("data:", data)
    console.log("start data2:", data2)

    if (data2.brand === undefined) {
        data2.brand = data.brand
    } else if (data2.brand === data.brand) {
        hasIt.brand = true
    }

    //console.log("model null?", data.model === null)

    if (data2.model === undefined) {
        data2.model = data.model
        //data2.model = undefined
    } else if (data2.model === data.model) {
        hasIt.model = true
    }

    if (data2.year === undefined) {
        data2.year = data.year
    } else if (data2.year === data.year) {
        hasIt.year = true
    }
    console.log("end data2:", data2)
    console.log("Value matches: ", hasIt)

    let set = " SET"

    let where = ` WHERE id = ${data2.id}`

    let command = `UPDATE table2`

    let notHas = []

    if (hasIt.brand) {
        where += ` AND brand = '${data2.brand}'`
    } else {
        notHas.push(`brand = '${data2.brand}'`)
    }

    if (hasIt.model) {
        where += ` AND model = '${data2.model}'`
    } else {
        notHas.push(`model = '${data2.model}'`)
    }

    if (hasIt.year) {
        where += ` AND year = ${data2.year}`
    } else {
        notHas.push(`year = ${data2.year}`)
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