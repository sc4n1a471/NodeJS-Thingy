const supertest = require("supertest");
const app = require("../../app");

/*
 * Uploads a car with license plate ZZZ222 with the request body from thr frontend
 */
describe('POST /cars/{ZZZ222}',  () => {
    it("",async () => {
        await supertest(app)
            .post('/cars')
            .expect(200)
            .send({
                license_plate: 'ZZZ222',
                brand_id: 1,
                brand: "DEFAULT_VALUE",
                model: "",
                codename: "",
                year: 1901,
                comment: "",
                is_new: 1
            })
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})