const express = require("express")
const app = express()

const db = require('./db.js')
const mc = require('./mc.js')

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

app.get("/", async (req, res) => {
    res.json("👋");
});
app.get("/request", mc.mc_query);
app.get("/api", db.getData);
app.get("/api/:id", db.getDataByID)
app.post("/api", db.createData)
app.put("/api/:id", db.updateData)
app.delete("/api/:id", db.deleteData)

// helloo