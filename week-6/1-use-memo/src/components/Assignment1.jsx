import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

// Explaination - on click of count button whole Assignment1 component is re-rendring which forcing expensive operation to run again and again which isnot good solution to this is :>  usememo Hook


export function Assignment1() {
    const [count, setCount] = useState(0)
    const [input, setInput] = useState(1);
    // Your solution starts here
    
    // +++++++++++++++++++++++++++++++++++
    // let expensiveValue = 1; 
    // Your solution ends here

    // for (let i = 1; i <= input ; i++) {
    //   expensiveValue = expensiveValue * i
        
    // }
    //    ++++++++++++++++++++++++++++++++++++++

     // use mem= ->

    const expensiveValue = useMemo(()=>{
        let result = 1
        for (let i = 1; i <= input; i++) {
            result = result * i           
            
        }
        return result

    } ,[input])

    return (
        <div>
            <button onClick={() => {
                setCount(count + 1)
            }}> Counter : {count}</button>
            <br>
            </br>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}

