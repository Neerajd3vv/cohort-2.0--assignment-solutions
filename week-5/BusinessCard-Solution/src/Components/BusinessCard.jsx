 function Businesscard({Name, about,linkedin,twitter,github,interestone,interesttwo,interestthree}){
   
    function Mytwitter(){
        window.location.href = twitter
      }
      
      function mygithub(){
        window.location.href = github
      }
    

    return (
        <div className='business-card'>
        <div className='Name-user'>
          <h1 >{Name}</h1>
        </div>
        <div className='Position'>
          <p>{about}</p>
        </div>
        <div className='interest'>
          <h3>Interest's</h3>
        </div>
        <div className='lists'>
        <ul>
          <li className='hehe'>{interestone}</li>
          <li className='hehe'> {interesttwo}</li>
          <li className='hehe'>{interestthree}</li>
        </ul>

        </div>
        <div className='button'>
          <button >Linkedin</button>
          <button onClick={Mytwitter}>Twitter</button>
          <button onClick={mygithub}>Github</button>
        </div>
      </div>
    )
}

export default Businesscard