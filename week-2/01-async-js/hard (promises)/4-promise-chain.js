/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t1) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("hi 1")
        }, t1 * 1000)
    })   

}

function wait2(t2) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("hi 2")
        }, t2 * 1000)
    }) 

}

function wait3(t3) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("hi 3")
        }, t3 * 1000)
    }) 

}

function calculateTime(t1, t2, t3) {
    const startTime = Date.now()  
    return wait1(t1)
    .then(()=>{
        return wait2(t2)
    })
    .then(()=>{
        return wait3(t3)
    })
    .then(()=>{
        return Date.now() - startTime
    })

}

calculateTime(1,2,3).then((totaltime)=>{
    console.log(`total time taken ${totaltime} milliseconds`);
})

module.exports = calculateTime;
