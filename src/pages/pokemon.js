import React from "react";
import PokemonDetails from "../components/pokemonDetail";

function Pokemon(props) {

    return(
        <>
            <h1>Mon pokemon</h1>
            <PokemonDetails pokemonId={2} />
        </>
    )
}

export default Pokemon