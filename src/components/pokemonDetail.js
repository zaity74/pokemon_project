import React, { useEffect, useState } from "react"; 
import axios from 'axios';

function PokemonDetails({pokemonId}) {
    // State 
    const [pokemonData, setPokemonData] = useState(null);

    // Effects
    useEffect(() => {
        const fetchData = async () => { 
            try {
                const firstRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data = firstRes.data;
                setPokemonData(data); 
            } catch(error) {
                console.error('Erreur:', error); 
            }
        };

        fetchData(); 
    }, [pokemonId]); 

    if (!pokemonData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{pokemonData.name}</h2>
            <p>{pokemonData.id}</p>
        </div>
    );
}

export default PokemonDetails;
