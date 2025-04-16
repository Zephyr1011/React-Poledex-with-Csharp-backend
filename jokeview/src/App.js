import './App.css';
import { useEffect, useState } from "react";

function App() {
    const [showPunchline, setShowPunchline] = useState(false);
    const [joke, setJoke] = useState({Setup: "Why did the chicken cross the road?", Punchline: "To get to the other side"});

    
    var jokeCardVisibility = "hidden";
    if(showPunchline == true) {
        jokeCardVisibility = "visible";
    }

  useEffect(()=>{
    fetch("http://localhost:5142/random_joke")
    .then(response => response.json())
    .then(data => {
        setJoke({Setup: data.setup, Punchline: data.punchline});
    })

  },[])  

  return (
    <div className="App">
        <div id="header">
            <h1>View Joke</h1>
        </div>

        <div id="jokeSection">

        <div className="jokeCard">
            <h2 id="jokeSetup">{joke.Setup}</h2>
            <h3 id="jokePunchline" style={{visibility: jokeCardVisibility}}>{joke.Punchline}</h3>
            <button id="showPunchline" onClick={() => {
                //Part 1
                setShowPunchline(true);
                }}>See punchline</button>
        </div>


            <div id="refresh">
                <button onClick={()=>{
                    console.log("Refreshing Joke...");
                    fetch("http://localhost:5142/random_joke")
                    .then(response => response.json())
                    .then(data => {
                        setJoke({Setup: data.setup, Punchline: data.punchline});
                    })
                }}>
                    <img width="20" src="./refresh.png"/>
                </button>
                <h3>Refresh Joke</h3>

            </div>
        </div>
    </div>
  );
}

export default App;
