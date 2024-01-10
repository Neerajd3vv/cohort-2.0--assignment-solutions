// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs")
fs.readFile("week-2/01-async-js/medium/ez.txt", "utf-8" , (err,data) =>{
    if(err) throw err
    console.log(data);
    const cleanData = data.replace(/\s+/g , " ")
    fs.writeFile("week-2/01-async-js/medium/ez.txt" , cleanData, (err)=>{
        if(err) throw err
        console.log("spaces has been removed");
    })

})

