const table1 = "table1"
const tableBrands = "brands"

const getDataCommand = `
        SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new,
            ${table1}.latitude,
            ${table1}.longitude
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        ORDER BY 
            license_plate;`
const getDataByIDCommand = (request) => {
    return `SELECT 
            ${table1}.license_plate, 
            ${table1}.brand_id,
            ${tableBrands}.brand, 
            ${table1}.model, 
            ${table1}.codename, 
            ${table1}.year, 
            ${table1}.comment, 
            ${table1}.is_new,
            ${table1}.latitude,
            ${table1}.longitude
        FROM 
            ${table1}
        INNER JOIN 
            ${tableBrands} 
        ON 
            ${table1}.brand_id = ${tableBrands}.brand_id
        WHERE 
            ${table1}.license_plate = '${(request.params.license_plate)}'
        ORDER BY 
            license_plate;`
}
const createDataCommand = `INSERT INTO ${table1}(license_plate, brand_id, model, codename, year, comment, is_new, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
const deleteDataCommand = (license_plate) => {
    return `DELETE FROM ${table1} WHERE license_plate = '${license_plate}';`
}
const checkDataCommand = (license_plate, table) => {
    return `
        SELECT 
            ${table}.license_plate, 
            ${table}.brand_id,
            brands.brand, 
            ${table}.model, 
            ${table}.codename, 
            ${table}.year, 
            ${table}.comment, 
            ${table}.is_new,
            ${table}.latitude,
            ${table}.longitude
        FROM 
            ${table}
        INNER JOIN 
            brands 
        ON 
            ${table}.brand_id = brands.brand_id
        WHERE 
            ${table}.license_plate = '${license_plate}'
        ORDER BY 
            license_plate;`
}

const getBrandsCommand = `SELECT * FROM ${tableBrands};`
const createBrandCommand = (brand) => {
    return `INSERT INTO ${tableBrands} (brand) VALUES ('${brand}')`;
}
const deleteBrandCommand = (brand_id) => {
    return `DELETE FROM ${tableBrands} WHERE brand_id = '${brand_id}';`
}

module.exports = {
    getDataCommand,
    getDataByIDCommand,
    createDataCommand,
    deleteDataCommand,
    checkDataCommand,
    getBrandsCommand,
    createBrandCommand,
    deleteBrandCommand
}