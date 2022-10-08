const responseCuccli = (response, success, message, cars, brands, code = 200) => {
    response.status(code)
    response.json({
        success: success,
        message: message,
        cars: cars,
        brands: brands
    })
}

module.exports = responseCuccli