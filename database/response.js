const responseCuccli = (response, success, message, cars, brands) => {
    response.json({
        success: success,
        message: message,
        cars: cars,
        brands: brands
    })
}

module.exports = responseCuccli