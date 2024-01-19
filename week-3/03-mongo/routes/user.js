const { Router } = require("express");
const router = Router();
const { User,Course} = require("../db")
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    const userCheck = await User.findOne({username: username , password: password})
    if (!userCheck) {
       User.create({
        username,
        password
       })
    }else{
        res.json({msg: "already a user"})
    }
    res.json({msg : "User created successfully"})
});

router.get('/courses',userMiddleware, async(req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find()
    res.json({msg:allCourses})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseid = req.params.courseId
    const username = req.headers.username
    await User.updateOne({
        username
    },{
        "$push" : {
            coursePurchased : courseid
        }
    })
    res.json({msg: "course added!"})


});

router.get('/coursePurchased', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username
    const user = await User.findOne({
        username
    })
    const yourcourses = await Course.find({
        _id : {
            "$in" : user.coursePurchased
        }
    })
    res.json({course : yourcourses})


});


module.exports = router