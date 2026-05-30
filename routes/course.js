// const express = require("express");
// const Router = express.Router; //we can also use these two lines instead of line 5, Your computer looks at the express variable,
//  sees it is an object, and uses the dot operator (.) to look up the key named "Router"

const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function(req, res)
{
    const userId = req.userId;
    const courseId = req.body.courseId;

    //here we should check that user has actually paid or not

    const purchasedCourse = await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        msg:"YOU have purchased the course"
    })
})

courseRouter.get("/preview", function(req, res)
{
   // all the current courses in the db, doesn't need to be authenticated
 
    const courses = await courseModel.find({ });

    res.json({
        message: "courses"
    })
})


module.exports = {
    courseRouter: courseRouter
}