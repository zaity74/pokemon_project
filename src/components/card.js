import React, { useEffect, useState } from "react"; 
import axios from 'axios';

function CardItems() {
    // State 
    const [pokemonRes, setPokemonRes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Effects
    useEffect(() => {
        const fetchData = async () => { 
            try {
                const firstRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
                const pokemonStartData = firstRes.data.results;

                // Pour chaque Pokémon récuprer les détails
                const pokemonDetail = await Promise.all(pokemonStartData.map(async (pokemon) =>{
                    const pokemonResponse = await axios.get(pokemon.url);
                    return pokemonResponse.data
                }))


                setPokemonRes(pokemonDetail);
                setLoading(false);
            } catch(error) {
                console.error('Erreur:', error); 
            }
        };

        fetchData(); 
    }, []);

    return (
        <div>
            {
                loading ? ( <p>Page Loading...</p>) : 

                (pokemonRes && pokemonRes.map((post, id) => (
                    <div className="card" key={id}>
                        <h2>Name : {post.name}</h2>
                        <p>Number : {post.id}</p>
                        <img src={post.sprites.front_default} alt="pokemon image" />
                        <p>Types : {post.types.map((type) => type.type.name).join(', ')}</p>
                        <p>Stats : </p>
                        <ul>
                            {post.stats.map((stat) => (
                                <li key={stat.stat.name}>{stat.stat.name}:{stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                )))
            }
        </div>
    );
}

export default CardItems;
