import React, { useState} from "react";
import PokemonDetails from "../components/pokemonDetail";
import { Link, useParams } from 'react-router-dom';


function Pokemon(props) {

    const { id } = useParams();

    return(
        <>
            <h1>Mon pokemon</h1>
            <PokemonDetails pokemonId={id} />
        </>
    )
}

export default Pokemon