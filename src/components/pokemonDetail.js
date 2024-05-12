import React, { useEffect, useState } from "react"; 
import axios from 'axios';

function PokemonDetails({pokemonId}) {
    // State 
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);

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


    return (
        <div>
            {
                loading ? (<p>Page Loading...</p>) : 
                (
                <>
                    <p>Number : {pokemonData.id}</p>
                    <h2>Name : {pokemonData.name}</h2>
                    <img src={pokemonData.sprites.front_default} alt="pokemon image" />
                    <p>Types : {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
                    <p>Stats :</p>
                    <ul>
                        {
                            pokemonData.stats.map((stat) => (
                                <li key={stat.stat.name}>{stat.stat.name}:{stat.base_stat}</li>
                            ))
                        }
                    </ul>
                    
                </>)
                    
            }
        </div>
    );
}

export default PokemonDetails;
