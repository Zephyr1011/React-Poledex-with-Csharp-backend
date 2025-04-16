import './App.css';
import Header from './Header';
import PokemonCard from './PokemonCard';
import { useState, useEffect } from "react";
function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [loading, setLoading] = useState(false);

    var pokemonCardsHTML = [];

    for(var i = 0; i < pokemonArray.length; i++) {
        var pokemon = pokemonArray[i];
        var pokemonCardHTML = <PokemonCard image_url={pokemon.image_url} title={pokemon.title} type={pokemon.type} color = {pokemon.color} />

        pokemonCardsHTML.push(pokemonCardHTML);
    }
    console.log(pokemonArray);
    useEffect(() => {
        fetchPokemon();
      }, []);
    
    const fetchPokemon = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5142/pokemon');
        const data = await response.json();
        setPokemonArray(data);
        setLoading(false);
    };
    let test = [<PokemonCard/>, <PokemonCard/>];
  return (
    <div className="App">

        <Header />

        <div id="mainContent">
            <div id="pokemonCardSection">
            {loading == true ? <h1>Fetching Pokemon...</h1> : pokemonCardsHTML}

            </div>
        </div>

        <div id="refresh">
        <button id="getRandomPokemonButton" onClick={() => { fetchPokemon() }}>
                <img src="./refresh.png" />
            </button>
            <h3>Get random pokemon</h3>
        </div>

    </div>
  );
}

export default App;
