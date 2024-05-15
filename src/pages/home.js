import React, { useEffect, useState } from "react";
import CardItems from "../components/card";
import { Form } from "react-router-dom";
import Navbar from "../components/navebar";



function Home() {
    // State 
    const [pokedexCount, setPokedexCount] = useState('') || null;
    const storedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

    // Effects

    return (

        <div>
            <Navbar pokedexCount={pokedexCount} setPokedexCount={setPokedexCount} storedPokedex={storedPokedex} />
            <br></br>
            <form />
            <br></br>
            <br></br>
            <div>
                <h1 style={{ textAlign: 'center' }}><span className="styledTitle">PokéAPI</span> (Liste de Pokémons)</h1>
            </div>
            <CardItems pokedexCount={pokedexCount} setPokedexCount={setPokedexCount} storedPoke={storedPokedex}/>

        </div>

    );
}

export default Home;
