const express = require("express")
const app = express()

const cars_get = require('./cars/cars_get.js')
const cars_post = require('./cars/cars_post.js')
const cars_put = require('./cars/cars_put.js')
const cars_delete = require('./cars/cars_delete.js')
const mc = require('./mc.js')
const test_get = require("./js_thingy/test_get.js");
const test_post = require("./js_thingy/test_post.js");
const test_put = require("./js_thingy/test_put.js");
const test_delete = require("./js_thingy/test_delete.js");

app.use(express.json())

app.listen(3000, "localhost", () => {
    console.log("Listening for request");
});

app.get("/", async (req, res) => {
    res.json("👋");
});
app.get("/request", mc.mc_query);
app.get("/test", test_get.getData);
app.get("/test/:id", test_get.getDataByID)
app.post("/test", test_post.createData)
app.put("/test/:id", test_put.updateData)
app.delete("/test/:id", test_delete.deleteData)

app.get("/cars", cars_get.getData);
app.get("/cars/:license_plate", cars_get.getDataByID)
app.post("/cars", cars_post.createData)
app.put("/cars/:license_plate", cars_put.updateData)
app.delete("/cars/:license_plate", cars_delete.deleteData)

// helloo