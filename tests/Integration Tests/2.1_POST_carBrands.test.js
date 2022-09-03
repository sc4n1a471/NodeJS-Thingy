const supertest = require("supertest");
const app = require("../../app");
let insertId = 0;

/*
 * Uploads a new car brand with name "TestBrand" and then deletes it with its new brand_id (insertId)
 */
describe('POST /carBrandsTest/{TestBrand}',  () => {
    it("",async () => {
        await supertest(app)
            .post('/carBrandsTest')
            .send({
                brand: "TestBrand"
            })
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
                insertId = response.body.brand_id
            })
    })
})

describe('DELETE /carBrands/insertId',  () => {
    it("",async () => {
        await supertest(app)
            .delete(`/carBrands/${insertId}`)
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})