const express = require("express");

const app = express();

app.post("/user/signup", function(req, res)
{
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signup", function(req, res)
{
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin", function(req, res)
{
    res.json({
        message: "signin endpoint"
    })
})

app.post("/user/purchase", function(req, res)
{
    res.json({
        message: "signup endpoint"
    })
})

app.get("/user/userCourses", function(req, res)
{
    res.json({
        message: "user courses"
    })
})

app.get("/courses", function(req, res)
{
    res.json({
        message: "app courses"
    })
})
app.listen(3000);