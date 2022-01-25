const util = require("minecraft-server-util");
//const http = require("http");
const express = require("express")
const app = express()
const url = require("url");
const mysql = require("mysql2")

const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    sessionID: 1, // a random 32-bit signed number, optional
    enableSRV: true // SRV record lookup
};

const con = mysql.createConnection({
    host: "192.168.5.172",
    user: "mysql_user",
    password: "123456789A",
    database: "js_thingy"
});

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

con.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to MySQL")
    }
})

app.get("/request", async (req, res) => {
    const urlPath = req.url;
    console.log("urlPath", urlPath)
    const queryData = url.parse(req.url, true).query
    console.log("queryData: ", queryData)

    const strippedUrl = urlPath.substring(0, urlPath.indexOf("?"))
    console.log("strippedUrl: ", strippedUrl)

    let mc_url = queryData.mc_url
    console.log(mc_url)


    console.log("lekérdezés indult");
    if (mc_url === undefined) {
        res.end("/request he");
    } else {
        util.status(mc_url, 25565, options)
            .then((result) => {
                res.end(JSON.stringify(result));

            }).catch((error) => console.error(error));
    }
    //res.end('Welcome to the "overview page" of the nginX project');
});

app.get("/api", async (req, res) => {
    //res.writeHead(200, { "Content-Type": "application/json" });
    res.json(
        {
            product_id: "xyz12u3",
            product_name: "NginX injector",
        }
    );
});

app.get("/", async (req, res) => {
    console.log("he")
    res.json("Successfully started a server");
});

app.get("/api/:id", async (req, res) => {
    const queryCommand = "SELECT * FROM table1 WHERE id = '" + req.params.id + "';"
    console.log(queryCommand)
    con.query(queryCommand, (error, results) => {
        console.log(results)
        if (!results[0]) {
            res.json({
                status: "Nope"
            })
        } else {
            res.json(results[0])
        }
    })
})

app.post("/api_post", async(req, res) => {
    let data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }
    console.log(data)
    let exist = 0

    const check = "SELECT * FROM table1 WHERE id = '" + data.id + "';"
    console.log(check)
    con.query(check, (error, results) => {
        console.log("Match found")
        console.log(results[0])
        exist = 1
    })
    let command = "";
    if (exist) {
        command = "UPDATE table1 SET name = '" + data.name + "', email"
    } else {
        command = "INSERT INTO table1 VALUES (?, ?, ?, ?)"
    }

    con.query(command, Object.values(data), (error) => {
        if (error) {
            res.json({
                status: "fail",
                message: error.code
            })
        } else {
            res.json({
                status: "success",
                message: data
            })
        }
    })
})

//hello