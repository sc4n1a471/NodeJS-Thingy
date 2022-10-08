const supertest = require("supertest");
const app = require("../../app");

/*
 * Uploads a car with license plate ZZZ222 with the request body from the frontend
 */
describe('POST /cars/{ZZZ222}',  () => {
    it("",async () => {
        await supertest(app)
            .post('/cars')
            .expect(201)
            .send({
                license_plate: 'ZZZ222',
                brand_id: 1,
                brand: "DEFAULT_VALUE",
                model: "",
                codename: "",
                year: 1901,
                comment: "",
                is_new: 1,
                latitude: 46.229014679521015,
                longitude: 20.18652304848268
            })
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})