const supertest = require("supertest");
const app = require("../../app");
const {Car} = require("../../cars/carModel");
describe('POST /cars/{ZZZ222}',  () => {
    it("",async () => {
        await supertest(app)
            .post('/cars')
            .expect(200)
            .send({license_plate: 'ZZZ222'})
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})