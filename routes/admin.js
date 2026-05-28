const {Router} = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config")

adminRouter.post("/signup", async function(req, res)
{
    //zod validation
    const requireBody = z.object({
        email: z.string().email().min(3).max(100),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const parsedDataWithSucess = requireBody.safeParse(req.body);

    if(!parsedDataWithSucess.sucess)
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

        await adminModel.create({
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
                message: "Admin already exist"
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
        message: "signup"
    })
})

adminRouter.post("/signin", async function(req, res)
{
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email
    })

    if(!admin)
    {
        res.json({
            msg: "This email doesn't exist in DB"
        })
        return;
    }

    //comparing hashed password-
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if(passwordMatch)
    {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SECRET)

        //Here we can also do cookie based auth
        res.json({
            token: token
        })
    }
    else
    {
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }
    
    res.json({
        message: "signin"
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
        message: "course updated"
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