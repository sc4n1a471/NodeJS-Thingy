const supertest = require("supertest");
const app = require("../../app");

/*
 * Queries one car with license plate "ZZZ222"
 */
describe('GET /cars/ZZZ222',  () => {
    it("", async () => {
        await supertest(app)
            .get('/cars/ZZZ222')
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})