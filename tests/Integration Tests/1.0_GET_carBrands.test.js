const supertest = require("supertest");
const app = require("../../app")

/*
 * Queries car brands
 */
describe('GET /carBrands',  () => {
    it("",async () => {
        await supertest(app)
            .get('/carBrands')
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})
