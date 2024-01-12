const { Router } = require("express");
const router = Router();
const { user,course} = require("../db")
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username
    const password = req.headers.password
    const userCheck = await user.findOne({username: username , password: password})
    if (!userCheck) {
        const addUser = new user({
            username: username,
            password: password
        })        
        addUser.save()
    }else{
        res.json({msg: "already a user"})
    }
    res.json({msg : "User created successfully"})
});

router.get('/courses',userMiddleware, async(req, res) => {
    // Implement listing all courses logic
    const allCourses = await course.find()
    res.json({msg:allCourses})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username =  req.headers.username
    await user.updateOne({
        username: username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    })

    res.json({msg: "message completed!"})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});


module.exports = router