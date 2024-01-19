const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const adminCheck =  await Admin.findOne({username: username, password: password})
    if (!adminCheck) {
        Admin.create({
            username,
            password
        })
    }else{
        return res.json({msg: "already a admin"})
    }
    res.json({msg: "Admin created successfully"})
   
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const imageLink =  req.body.imageLink
    const price = req.body.price


     const newCourse =   await Course.create({
            title,
            description,
            imageLink,
            price
        })   

      res.json({msg:"course created successfully!" , courseId : newCourse._id})   
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourse = await Course.find()
    res.json({courses: allCourse})     
});

module.exports = router;