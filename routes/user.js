const { Router } = require("express");

const userRouter = Router();
const { userModel } = require("../db")
const { purchaseModel } = require("../db");

userRouter.post("/signup", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body);

    if(!parsedDataWithSuccess)
    {
        res.json({
            msg: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
    }
})

userRouter.post("/login", function(req, res){
    const email = req.body.email;
    const password = req.body.password




})

userRouter.get("/purchases", function(rq, res){

})

module.exports = {
    userRouter: userRouter
}