// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.


const fs = require("fs")
const fileData = "me ek data hu pyara chotu data"
fs.writeFile("week-2/01-async-js/easy/writeToMe.txt",fileData, (err) => {
    if(err) throw err
    console.log("write done!");
})


