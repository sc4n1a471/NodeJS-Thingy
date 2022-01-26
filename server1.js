const express = require("express")
const app = express()

const db = require('./db.js')
const mc = require('./mc.js')

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

app.get("/request", mc.mc_query);

app.get("/api", db.getUsers);

app.get("/", async (req, res) => {
    res.json("👋");
});

app.get("/api/:id", db.getUsersID)

app.post("/api_post", db.createUser)

//hello