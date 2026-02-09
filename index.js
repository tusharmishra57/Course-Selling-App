const express = require("express");
const{z} = require("zod");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course")
const app = express();


app.use("/user", userRouter)
app.use("/course", courseRouter)

//Login, Signup, purchase a course, sees all courses, sees the purcahsed courses







app.listen(3000);