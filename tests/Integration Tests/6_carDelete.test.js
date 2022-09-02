const supertest = require("supertest");
const app = require("../../app");

describe('DELETE /cars/ZZZ223',  () => {
    it("",async () => {
        await supertest(app)
            .delete('/cars/ZZZ222')
            .expect(200)
            // .then((response) => {
            //     expect(response.body.status).toBe("success")
            // })

        await supertest(app)
            .delete('/cars/ZZZ223')
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
            })
    })
})