const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin , Course} = require("../db")

const router = Router();
const jwt = require("jsonwebtoken")
const {secret} = require("../config")

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const checkAdmin = await Admin.findOne({
        username : username,
        password : password

    })
    if (!checkAdmin) {
        Admin.create({
            username,
            password
        })
        
    }else{
      return  res.json({msg : "Already a Admin"})

    }
    res.json({ msg : "Admin created Successfully"})
    
    
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const checkAdmin = await Admin.findOne({
        username,
        password
    })
    if (!checkAdmin) {
      return res.json({msg: "You are not a Admin , Sign up first"})

    }else{
        const token = jwt.sign({username : username }, secret)
        res.json({Token : token})
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
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
    const coursesAll = await Course.find()
    res.json({Courses : coursesAll})

});

module.exports = router;