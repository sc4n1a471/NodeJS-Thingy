const express = require("express")
const app = express()

const db = require('./db.js')
const mc = require('./mc.js')
const {updateUser} = require("./db");

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

app.get("/", async (req, res) => {
    res.json("👋");
});
app.get("/request", mc.mc_query);
app.get("/api", db.getUsers);
app.get("/api/:id", db.getUsersID)
app.post("/api", db.createUser)
app.put("/api/:id", updateUser)
app.delete("/api/:id", db.deleteUser)

//hello