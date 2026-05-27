// const express = require("express");
// const Router = express.Router; //we can also use these two lines instead of line 5, Your computer looks at the express variable,
//  sees it is an object, and uses the dot operator (.) to look up the key named "Router"

const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", function(req, res)
{
    res.json({
        message: "courses"
    })
})


module.exports = {
    courseRouter: courseRouter
}