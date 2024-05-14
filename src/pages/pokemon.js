import React, { useState } from "react";
import PokemonDetails from "../components/pokemonDetail";
import { Link, useParams } from 'react-router-dom';
import Navbar from "../components/navebar";


function Pokemon(props) {

    const { id } = useParams();

    return (
        <>
            <Navbar />

            <PokemonDetails pokemonId={id} />
        </>
    )
}

export default Pokemon