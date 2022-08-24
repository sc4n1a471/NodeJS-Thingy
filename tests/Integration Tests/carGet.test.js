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

describe('GET /cars/ZZZ111',  () => {
    it("", async () => {
        await supertest(app)
            .get('/cars/ZZZ111')
            .expect(200)
            .then((response) => {
                // console.log(response)
                expect(response.body.status).toBe("success")
            })
    })
})