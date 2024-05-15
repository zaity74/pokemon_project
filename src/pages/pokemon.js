import React, { useState } from "react";
import PokemonDetails from "../components/pokemonDetail";
import { Link, useParams } from 'react-router-dom';
import Navbar from "../components/navebar";


function Pokemon(props) {

    const { id } = useParams();
    const [pokedexCount, setPokedexCount] = useState('') || null;
    const storedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

    return (
        <>
            <Navbar pokedexCount={pokedexCount} setPokedexCount={setPokedexCount} storedPokedex={storedPokedex} />
            <br></br>
            <br></br>
            <PokemonDetails pokemonId={id} />
        </>
    )
}

export default Pokemon