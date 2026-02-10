const { Router } = require("express");
const adminRouter = Router();

const { adminModel } = require("../db")

const { z } = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { parse } = require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;

adminRouter.post("/signin", async function(req, res){
    const { email, password, firstName, lastName } = req.body;

    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        password: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body);

    if(!parsedDataWithSuccess)
    {
        res.json({
            msg: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
    }

    try
    {
        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            msg: "You are signed in"
        })
    }
    catch(e)
    {
        if(e.code === 11000)
        {
            res.json({
                msg: "User already exist"
            })
        }
        else
        {
            res.status(500).json({
                msg: "Internal Error"
            })
        }
    }

})

adminRouter.post("/login", async function(req, res){
    const email = req.body.email;
    const password = req.body.password

    const user = await adminModel.findOne({
        email: email
    })

    if(!user)
    {
        res.json({
            msg: "This email doesn't exist in the database"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch)
    {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)
    }
    else{
        res.status(403).json({
            msg: "Incorrect Password"
        })
    }

})

adminRouter.post("/course", function(req, res){

})

adminRouter.put("/course", function(rq, res){

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
    adminRouter
}