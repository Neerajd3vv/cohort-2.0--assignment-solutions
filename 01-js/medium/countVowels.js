/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    
  const allVowels = ["a","e","i","o","u","A","E","I","O","U"]
  let numberOfVowels = 0
  for (let i = 0; i < str.length; i++) {
    if (allVowels.includes(str[i])) {
      numberOfVowels += 1
    }
  }
  return numberOfVowels  
}

module.exports = countVowels;