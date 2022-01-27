const url = require("url");
const util = require("minecraft-server-util");

const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    sessionID: 1, // a random 32-bit signed number, optional
    enableSRV: true // SRV record lookup
};

const mc_query = (request, response) => {
    console.log("===========")

    console.log("Domain/IP: ", request.query.mc_url)
    let mc_url = request.query.mc_url

    if (mc_url === undefined) {
        console.log("No URL provided");
        response.json({
            status: "error",
            message: "No domain/IP address provided"
        });
    } else {
        util.status(mc_url, 25565, options)
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