const express = require("express");
const{z} = require("zod");
const app = express();

//Login, Signup, purchase a course, sees all courses, sees the purcahsed courses

app.post("/user/signup", function(req, res){
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

app.post("/user/login", function(req, res){
    const email = req.body.email;
    const password = req.body.password




})

app.get("/courses", function(req, res){

})

app.post("/courses/purchase", function(req, res){

})

app.get("/user/purchases", function(rq, res){

})



app.listen(3000);