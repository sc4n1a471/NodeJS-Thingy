const express = require("express")
const app = express()

const db_get = require('./db/get.js')
const db_post = require('./db/post.js')
const db_put = require('./db/put.js')
const db_delete = require('./db/delete.js')
const mc = require('./mc.js')

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

app.get("/", async (req, res) => {
    res.json("👋");
});
app.get("/request", mc.mc_query);
app.get("/api", db_get.getData);
app.get("/api/:id", db_get.getDataByID)
app.post("/api", db_post.createData)
app.put("/api/:id", db_put.updateData)
app.delete("/api/:id", db_delete.deleteData)

// helloo