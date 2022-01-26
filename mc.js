const url = require("url");
const util = require("minecraft-server-util");

const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    sessionID: 1, // a random 32-bit signed number, optional
    enableSRV: true // SRV record lookup
};

const mc_query = (request, response) => {
    console.log("===========")

    const urlPath = request.url;
    console.log("urlPath", urlPath)
    const queryData = url.parse(request.url, true).query
    console.log("queryData: ", queryData)

    const strippedUrl = urlPath.substring(0, urlPath.indexOf("?"))
    console.log("strippedUrl: ", strippedUrl)

    let mc_url = queryData.mc_url
    console.log(mc_url)

    console.log("lekérdezés indult");
    if (mc_url === undefined) {
        response.end("/request he");
    } else {
        util.status(mc_url, 25565, options)
            .then((result) => {
                response.end(JSON.stringify(result));

            }).catch((error) => console.error(error));
    }
    console.log("===========")
}

module.exports = {
    mc_query
}