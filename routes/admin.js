const {Router} = require("express");
const adminRouter = Router();

adminRouter.post("/signin", function(req, res)
{
    res.json({
        message: "signin"
    })
})

adminRouter.post("/signup", function(req, res)
{
    res.json({
        message: "signed up"
    })
})

adminRouter.post("/newcourse", function(req, res)
{
    res.json({
        message: "posted new course"
    })
})

adminRouter.put("/course", function(req, res)
{
    res.json({
        message: "signed up"
    })
})

adminRouter.get("/course/bulk", function(req, res)    //get all of the courses that admin has created
{
    res.json({
        message: "get my courses (admin)"
    })
})


module.exports = {
    adminRouter: adminRouter
}