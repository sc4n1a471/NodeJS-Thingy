let data = {
    brand: "Apple",
    model: "MacBook",
    year: 2020,
    id: 11117
}

let hasIt = {
    brand: true,
    model: false,
    year: true
}

let set = " SET"

let where = ` WHERE id = ${data.id}`

let command = `UPDATE table2`

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

if (hasIt.year) {
    where += ` AND year = ${data.year}`
} else {
    notHas.push(`year = ${data.year}`)
}

set += " " + notHas.join(",")
command += set
command += where


command_old = `UPDATE table SET brand = (?),
                model = (?),
                year = (?)
                WHERE id = (?);`

console.log(set)
console.log(command)
console.log("where:", where)
console.log("whereCounter:", whereCounter)
