/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
        // case insensitive 
        str = str.toLowerCase()
        // removes non alphanumeric chracters
        str = str.replace(/[^a-z0-9]/g, "")
        // comparing string with reverse string to check its palindrome or not
        return str === str.split("").reverse().join("")      
}

module.exports = isPalindrome;
