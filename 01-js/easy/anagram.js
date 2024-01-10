/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
      // removes whitespaces and lowercases the input
      str1 = str1.replace(/\s/g,'').toLowerCase()
      str2 = str2.replace(/\s/g,'').toLowerCase()
      // length of the string must be equal to be an anagram
       if (str1.legth !== str2.legth) {
          return false;
       }
      // sorting the string
      str1 = str1.split('').sort().join('')
      str2 = str2.split('').sort().join('')
      // cheacking wheather both are equal or not
      return str1 === str2

}

module.exports = isAnagram;
