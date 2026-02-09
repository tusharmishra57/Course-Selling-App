require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const{z} = require("zod");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/admin", adminRouter)

//Login, Signup, purchase a course, sees all courses, sees the purcahsed courses





async function main()
{
    await mongoose.connect(MONGO_URL)
    app.listen(PORT);
}
