import React, { useState, useCallback } from 'react';

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.




export function Assignment2(){
    return <div>
        <Componenthehe/>
    </div>
}

function Componenthehe(){
    const [inputText , setInputText] = useState()

    const buttonClicked = useCallback(() => {
        alert(inputText)
    },[inputText])


 
    return <div>
        <input
        type='text'
        onChange={(e) => {setInputText(e.target.value)}}
        ></input>
        <br></br>
        <br></br>
        <button
        onClick={buttonClicked}
        >Alert
        </button>
    </div>
}