const supertest = require("supertest");
const app = require("../../../app")

describe('GET /carBrands',  () => {
    it("",async () => {
        await supertest(app)
            .get('/carBrands')
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe("success")
            })
    })
})
