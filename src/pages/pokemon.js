import React, { useState } from "react";
import PokemonDetails from "../components/pokemonDetail";
import { Link, useParams } from 'react-router-dom';
import Navbar from "../components/navebar";


function Pokemon(props) {

    const { id } = useParams();

    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <PokemonDetails pokemonId={id} />
        </>
    )
}

export default Pokemon