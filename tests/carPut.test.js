const supertest = require("supertest");
const app = require("../app");

describe('PUT /cars/ZZZ111',  () => {
    it("",async () => {
        await supertest(app)
            .put('/cars/ZZZ111')
            .expect(200)
            .send({comment: 'testing'})
            .then((response) => {
                expect(response.body.status).toBe("success")
            })
    })
})