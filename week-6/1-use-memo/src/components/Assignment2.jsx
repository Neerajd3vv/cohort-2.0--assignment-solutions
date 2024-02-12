import React, { useEffect, useState } from "react";

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items. 
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array


let randomWords = ["hello " , "random" , "kuch " , "bhi" , "harkirat " ,"cohort" , "grind"]

const lines = 10
const allWords = []
for (let i = 0; i <= lines; i++) {
    let sentences  = ""
    for (let j = 0; j <= randomWords.length; j++) {
        sentences +=  (randomWords[  Math.floor(randomWords.length * Math.random())])

        sentences += " "
        
    }
    allWords.push(sentences)
    
}


export function Assignment2(){
    const [sentences , setSentences ] = useState(allWords)
    const [filter , setFilter] = useState("")

    const filteredSentences = usememo( () => {
        return sentences.filter(e => e.includes(filter))

        },[filter, sentences])

 
    return <div>
        <input
        type="text"
        onChange={(e) => {
            setFilter(e.target.value)
        }}
        ></input>
        {filteredSentences.map(word => <div>
            {word}
        </div>)}
    </div>
}