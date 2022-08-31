const supertest = require("supertest");
const app = require("../../app");

describe('GET /cars',  () => {
    it("", async () => {
        await supertest(app)
            .get('/cars')
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe("success")
            })
    })
})