const supertest = require("supertest");
const app = require("../../app");

describe('PUT /cars/ZZZ222',  () => {
    it("",async () => {
        await supertest(app)
            .put('/cars/ZZZ222')
            .expect(200)
            .send({
                license_plate: 'ZZZ223',
                is_new: 1,
                model: 'DEFAULT_VALUE',
                brand: 'DEFAULT_VALUE',
                year: 1901,
                codename: 'DEFAULT_VALUE',
                comment: 'testing',
                brand_id: 1
            })
            .then((response) => {
                expect(response.body.status).toBe("success")
            })
    })
})