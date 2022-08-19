const responseCuccli = (response, status, message, cars, brands) => {
    response.json({
        status: status,
        message: message,
        cars: cars,
        brands: brands
    })
}

module.exports = responseCuccli