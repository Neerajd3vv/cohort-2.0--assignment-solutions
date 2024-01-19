const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken")
const {secret} = require("../config")
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    const checkUser = await User.findOne({
        username,
        password
    })
    if (!checkUser) {
        User.create({
            username,
            password

        })
    }else{
      return  res.json({msg: "Already a user"})
    }
    res.json({msg : "User created successfully"})
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const checkUser = await User.findOne({
        username,
        password
    })
    if (!username) {
        req.josn({msg : "you are not an User , signup first "})
    }else{
        const token = jwt.sign({username : username} , secret)
        res.json({Token : token})
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({})
    res.json({Courses : allCourses}) 
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const purchaseId = req.params.courseId
     await User.updateOne({
        username : req.username
    },{
        "$push" : {
            purchasedCourses : purchaseId
        }
    })
    res.json({msg : "purachased complete"  } )
});


router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: req.username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});


router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username :  req.username
    })
    const myCourses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    })
    res.json({YourCourses : myCourses})
});

module.exports = router