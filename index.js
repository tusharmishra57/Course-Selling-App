const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();
app.use(express.json);

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);


//rapping the mongodb connection and app.listen inside a main function so that if it is not able to connect to DB, backend do not starts.
async function main()
{
    try {
        await mongoose.connect("MongoDB URL");
        console.log("Successfully connected to the mongoDB cluster");

        app.listen(3000, () => {
            console.log("server is running on port 3000");
        })
    }
    catch(error) {
        console.log("DB failed", error);
    }
}

main();