const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("your db url");

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition 
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition 
    username: String,
    password: String,
    coursePurchased: [{
        type : mongoose.Schema.Types.objectID,
        ref : "course"
    }]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition 
    title : String,
    description: String,
    imageLink: String,
    price : number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}