function PokemonCard(props){

    // Part 2: The footer of each pokemon card should represent the the "type" of pokemon it holds 


    return <div className="pokemonCard">
                <img src={props.image_url} />
                <h3 className="pokemonName">{props.title}</h3>
                 <div className="footer" style={{backgroundColor: props.color}}>
                    <div className="pokemonType">
                        <h3>{props.type}</h3>
                    </div>
                </div>
            </div>
}

export default PokemonCard;