const supertest = require("supertest");
const app = require("../../app");

describe('PUT /cars/ZZZ222',  () => {
    it("",async () => {
        await supertest(app)
            .put('/cars/ZZZ222')
            .expect(200)
            .send({comment: 'testing'})
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})
