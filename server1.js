const express = require("express")
const app = express()

const carGet = require('./cars/carGet.js')
const carPost = require('./cars/carPost.js')
const carPut = require('./cars/carPut.js')
const carDelete = require('./cars/carDelete.js')
const carBrands = require('./cars/carBrands.js')
const mc = require('./mc.js')
// const test_get = require("./js_thingy/test_get.js");
// const test_post = require("./js_thingy/test_post.js");
// const test_put = require("./js_thingy/test_put.js");
// const test_delete = require("./js_thingy/test_delete.js");

app.use(express.json())

app.listen(3000, "0.0.0.0", () => {
    console.log("Listening for request...");
});

app.get("/", async (req, res) => {
    res.json("👋");
});
app.get("/mc", mc.mc_query);
// app.get("/test", test_get.getData);
// app.get("/test/:id", test_get.getDataByID)
// app.post("/test", test_post.createData)
// app.put("/test/:id", test_put.updateData)
// app.delete("/test/:id", test_delete.deleteData)

app.get("/cars", carGet.getData);
app.get("/carBrands", carBrands.getBrands);
app.get("/cars/:license_plate", carGet.getDataByID)
app.post("/cars", carPost.createData)
app.put("/cars/:license_plate", carPut.updateData)
app.delete("/cars/:license_plate", carDelete.deleteData)

// helloo