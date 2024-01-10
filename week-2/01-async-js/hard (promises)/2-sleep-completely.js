/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    const startTime = Date.now()
    return new Promise((resolve) => {
        while(Date.now() - startTime < milliseconds){
  
        }
        resolve()
    })
}

console.log("before delay");
sleep(2000).then(() => {console.log("Delayed the thread for 2sec");})
console.log("after delay");


module.exports = sleep;
