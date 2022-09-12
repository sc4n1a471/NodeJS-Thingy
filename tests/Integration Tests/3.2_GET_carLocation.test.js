const supertest = require("supertest");
const app = require("../../app");

/*
 * Queries one car with license plate "ZZZ222" and check for location
 */
describe('GET /cars/ZZZ222',  () => {
    it("", async () => {
        await supertest(app)
            .get('/cars/ZZZ222')
            .expect(200)
            .then((response) => {
                expect(response.body.cars[0].latitude).toBe(46.229014679521015)
                expect(response.body.cars[0].longitude).toBe(20.18652304848268)
            })
    })
})