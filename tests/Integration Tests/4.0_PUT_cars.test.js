const supertest = require("supertest");
const app = require("../../app");

/*
 * Updates the car with license plate "ZZZ222" with {comment: "testing", is_new: 0} like on frontend
 */
describe('PUT /cars/ZZZ222',  () => {
    it("",async () => {
        await supertest(app)
            .put('/cars/ZZZ222')
            .expect(200)
            .send({
                license_plate: "ZZZ222",
                brand_id: 1,
                brand: "DEFAULT_VALUE",
                model: "DEFAULT_VALUE",
                codename: "DEFAULT_VALUE",
                year: 1901,
                comment: "testing",
                is_new: 0,
                latitude: 47,
                longitude: 21
            })
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})
