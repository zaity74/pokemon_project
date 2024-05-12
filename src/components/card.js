
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import SearchForm from "./form";

function CardItems() {
    const [pokemonRes, setPokemonRes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
                const pokemonStartData = firstRes.data.results;

                const pokemonDetail = await Promise.all(pokemonStartData.map(async (pokemon) => {
                    const pokemonResponse = await axios.get(pokemon.url);
                    return pokemonResponse.data
                }))

                setPokemonRes(pokemonDetail);
                setLoading(false);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <SearchForm pokemons={pokemonRes} setFilteredPokemons={setFilteredPokemons} />
            {
                loading ? (<p>Page Loading...</p>) :
                    (filteredPokemons.length > 0 ? filteredPokemons.map((post, id) => (
                        <Link to={`/pokemon/${post.id}`} key={id}>
                            <div className="card">
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
                        </Link>
                    )) : 
                    (pokemonRes && pokemonRes.map((post, id) => ( // Ajout de parenthèses ici
                        <Link to={`/pokemon/${post.id}`} key={id}>
                            <div className="card">
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
                        </Link>
                    ))) // Parenthèses fermantes ici
                )
            }
        </div>
    );
}

export default CardItems;

