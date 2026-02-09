const { Router } = require("express");
const adminRouter = Router();

const { adminModel } = require("../db")

adminRouter.post("/signin", function(req, res){

})

adminRouter.post("/login", function(req, res){

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