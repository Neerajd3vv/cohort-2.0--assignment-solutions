/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t1) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve("hi 1")
        }, t1 * 1000)
    })

}

function wait2(t2) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve("hi 2")
        }, t2 * 1000)
    })

}

function wait3(t3) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve("hi 3")
        }, t3 * 1000)
    })
}



function calculateTime(t1, t2, t3) {
    const startTime =  Date.now()
    const promiseOne = wait1(t1)
    const promiseTwo = wait2(t2)
    const promiseThree = wait3(t3)
    return Promise.all([promiseOne,promiseTwo,promiseThree]).then(()=>{
        const endTime =  Date.now()
        const totaltime = endTime - startTime
        return totaltime
    })

}

calculateTime(1,2,3).then((totalTime)=>{
    console.log(`total time took : ${totalTime} milliseconds` );
})
module.exports = calculateTime;
