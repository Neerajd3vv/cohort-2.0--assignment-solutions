// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

function redMeBaby(){
    const fs = require("fs")
    // fs.readFile is asyn function .JS assign this reading task to other and move forward to do expensive operation & only after the tread become free data in file get logged
    fs.readFile("week-2/01-async-js/easy/a.txt","utf-8",function(err,data){
        // method for error handling
        if (err) throw err
        console.log(data);
    })
    // expensive operation
    let iniNumber = 0
    for (let i = 0; i < 1000000000; i++) {
        iniNumber += i
        
    }
    // gliobal safety net for uncaught err
    process.on("uncaughtException" , err => {
        console.error(`uncaught error: ${err}`);
        process.exit(1)
    })

}
redMeBaby()
