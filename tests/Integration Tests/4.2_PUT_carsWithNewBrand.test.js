const supertest = require("supertest");
const app = require("../../app");
let brand_id = 0

/*
 * Updates car with license plate "ZZZ223" with new {brand: "TestBrand2"} like on frontend
 * After update, it queries that car to test its brand
 * After query, it deletes that brand
 */
describe('PUT /cars/ZZZ223',  () => {
    it("",async () => {
        await supertest(app)
            .put('/cars/ZZZ223')
            .expect(200)
            .send({
                license_plate: 'ZZZ223',
                is_new: 0,
                model: 'DEFAULT_VALUE',
                brand: 'TestBrand2',
                year: 1901,
                codename: 'DEFAULT_VALUE',
                comment: 'testing',
                brand_id: 1,
                latitude: 47,
                longitude: 21
            })
            .then((response) => {
                expect(response.body.success).toBe(true)
            })

        await supertest(app)
            .get('/cars/ZZZ223')
            .expect(200)
            .then((response) => {
                brand_id = response.body.cars[0].brand_id
                expect(response.body.cars[0].brand).toBe("TestBrand2")
            })

        await supertest(app)
            .delete(`/carBrands/${brand_id}`)
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})