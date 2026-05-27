// const express = require("express");
// const Router = express.Router;

const { Router } = require("express");
const userRouter = Router(); //This executes the constructor function we pulled out in Line 4,
// creating a brand-new instance of an isolated routing container

userRouter.post("/signin", function(req, res)
{
    res.json({
        message: "signin"
    })
})

userRouter.post("/signup", function(req, res)
{
    res.json({
        message: "signed up"
    })
})

userRouter.get("/purchases", function(req, res)
{
    res.json({
        message: "purchases"
    })
})

module.exports = {
    userRouter: userRouter
}