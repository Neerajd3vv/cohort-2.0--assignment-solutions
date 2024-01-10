// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.




function counter(input){
    console.log(input)
    input++
    setTimeout(() => {
    counter(input)
    },1000)

}
counter(0)





































































(Hint: setTimeout)