// const express = require("express");
// const Router = express.Router;

const { Router } = require("express");
const userRouter = Router(); //This executes the constructor function we pulled out in Line 4,
// creating a brand-new instance of an isolated routing container

const {userModel} = require("../db");
const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config")
const { userMiddleware } = require("../middleware/user")

userRouter.post("/signup", async function(req, res)
{
    //zod validation
    const requireBody = z.object({
        email: z.string().email().min(3).max(100),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const parsedDataWithSucess = requireBody.safeParse(req.body);

    if(!parsedDataWithSucess.success)
    {
        res.json({
            message: "incorrect format",
            error: parsedDataWithSucess.error
        })
        return;
    }

    const {email, password, firstName, lastName} = req.body;


    //storing it in DB.
    try{
    //Password hashing
    const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    }
    catch(e)
    {
        if(e.code === 11000)
        {
            res.json({
                message: "User already exist"
            })
        }
        else
        {
            res.status(500).json({
                msg: "Internal Error"
            })
        }
    }
    


    res.json({
        message: "signin"
    })
})

userRouter.post("/signin", async function(req, res)
{
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email //Here we are not doing find instead using findOne because,
        //  .find will return an array which can be empty(if no user with email found) and findOne will give either user or Undefined
    })

    if(!user)
    {
        res.json({
            msg: "This email doesn't exist in DB"
        })
        return;
    }

    //comparing hashed password-
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch)
    {
        const token = jwt.sign({
            id: user._id
        }, JWT_user_SECRET)

        //Here we can also do cookie based auth
        res.json({
            token: token,
            message: "signed in"
        })
    }
    else
    {
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }
    
})

userRouter.get("/purchases", userMiddleware, async function(req, res)
{
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })

    //purchases will return an array

    //we need to find the purchased coursesData
    let purchasedCourseIds = [];

    for(let i = 0; i<purchases.length; i++)
    {
        purchasedCourseIds.push = purchases[i].courseId;
    }

    const coursesData = await courseModel.find({
        _id: {$in: puchasedCourseIds}
    })

    //we can do it using references

    res.json({
        message: "purchases",
        purchases: purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}