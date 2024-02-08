import { useState } from 'react'

import './App.css'
import Businesscard from './Components/BusinessCard'


function App() {
  // const [count, setCount] = useState(0)
  


  return (
    <div className='main-div'>
    <Businesscard Name = "Neeraj bhatt"
     about = "A student of 100xDevs Cohort 2.0"
     linkedin ="" 
     twitter="https://twitter.com/NeerajbhattW" 
     github="https://github.com/Neerajd3vv" 
     interestone="Interested in frontend " 
     interesttwo="love to build React procjects" 
     interestthree="Gaming "
      />
    <Businesscard Name = "Itachi uchiha"
     about = "testing - about props"
     linkedin ="" 
     twitter="" 
     github="" 
     interestone="Interested in frontend " 
     interesttwo="love to build React procjects" 
     interestthree="Gaming "
      />
    <Businesscard Name = "Rahul rawat"
     about = "testing - about props"
     linkedin ="" 
     twitter="" 
     github="" 
     interestone="Test interested 1" 
     interesttwo="Test interested 2" 
     interestthree="Test interested 3"
      />
    
  
   
 
    
   
    
    </div>   
  
  )
}

export default App
