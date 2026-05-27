// const mongoose = require("mongoose");
// const Schema = mogoose.schema;

const mongoose = require("mongoose");
const { Schema } = require("mongoose");  //either way is fine.
const objectId = Schema.ObjectId;

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String

});

const adminSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: objectId
});

const purchaseSchema = new Schema({
    userId: objectId,
    courseId: objectId
});


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};