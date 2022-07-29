const url = require("url");
const util = require("minecraft-server-util");

const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    sessionID: 1, // a random 32-bit signed number, optional
    enableSRV: true // SRV record lookup
};

const mc_query = (request, response) => {
    console.log("===========")
    console.log("Domain/IP: ", request.query.mcUrl)
    let mcUrl = request.query.mcUrl

    if (mcUrl === undefined) {
        console.log("No URL provided");
        response.json({
            status: "error",
            message: "No domain/IP address provided"
        });
    } else {
        util.status(mcUrl, 25565, options)
            .then((result) => {
                response.json(result)
            }).catch((error) => {
                response.json(error)
        });
    }
    console.log("===========")
}

module.exports = {
    mc_query
}