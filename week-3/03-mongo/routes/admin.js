const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const adminCheck =  await Admin.findOne({username: username, password: password})
    if (!adminCheck) {
        const addAdmin = new Admin({
            username: username,
            password : password
        })        
        addAdmin.save()
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
    const courseCheck = await Course.findOne({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price,
    })
    if (!courseCheck) {
        const addNewCourse = new Course({
            title: title,
            description: description,
            imageLink: imageLink,
            price: price,
        })
        addNewCourse.save()        
    }else{
       return res.json({msg:"course already listed"})
    } 
      res.json({msg:"course created successfully!"})   
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourse = await Course.find()
    res.json({courses: allCourse})     
});

module.exports = router;