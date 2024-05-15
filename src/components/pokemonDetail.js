import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function PokemonDetails({ pokemonId }) {
    // State 
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    // Effects
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data = response.data;
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [pokemonId]);

    return (
    <>
        <div className="container">
            {loading ? (
                <p className="text-center">Page Loading...</p>
            ) : (
                pokemon ? (
                    <div className="row">
                        <div className="col s12 m8 offset-m2">
                            <div>
                                <h1 style={{ textAlign: 'center' }}>
                                    <span className="styledTitle">Détails du pokémon</span> : {pokemon.name}</h1>
                            </div>
                            <div className="card horizontal hoverable">
                                <div className="card-image" style={{ flex: 'none' }}>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content" style={{ textAlign: 'right' }}>
                                        <table className="bordered striped">
                                            <tbody>
                                                <tr>
                                                    <td>Nom</td>
                                                    <td><strong>{pokemon.name}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Points de vie (HP)</td>
                                                    <td><strong>{pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 'N/A'}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Dégâts (CP)</td>
                                                    <td><strong>{pokemon.stats.find(stat => stat.stat.name === 'cp')?.base_stat || 'N/A'}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Types</td>
                                                    <td>
                                                        {pokemon.types.map((type, index) => (
                                                            <span key={index} className={type.type.name}>{type.type.name}</span>
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Date de création</td>
                                                    <td><em>{new Date().toLocaleDateString()}</em></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-action">
                                        <Link to={"/"} >Retour</Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h4 className="center">Aucun Pokémon à afficher !</h4>
                )
            )}
        </div>
    
    </>
    );
}

export default PokemonDetails;
