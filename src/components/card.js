
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import SearchForm from "./form";
import { Alert } from "bootstrap";
import Navbar from "./navebar";



function CardItems() {
    //State
    const [pokemonRes, setPokemonRes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokedex, setPokedex] = useState([]);

    //comportment 
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

    const handleaddtopokedex = (id, name) => {

        if (pokedex.some(pokemon => pokemon.id === id)) {
            alert('le pokemon a été deja ajouter au pokedex');
            return;

        }

        const pokemonToAdd = pokemonRes.find(pokemon => pokemon.id === id);
        setPokedex(prevPokedex => [...prevPokedex, pokemonToAdd])

        //ajouter au localStorage
        const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
        localStorage.setItem("pokedex", JSON.stringify([...storedPokedex, pokemonToAdd]));


        alert("Le Pokemon" + "  " + name + " " + " a été bien ajouter au pokedex")
        console.log(name);
    }




    //Affichage
    return (

        <div className="container">

            <SearchForm pokemons={pokemonRes} setFilteredPokemons={setFilteredPokemons} />


            {loading ? (
                <p className="text-center">Page Loading...</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3">
                    {filteredPokemons.length > 0 ? filteredPokemons.map((pokemon, id) => (
                        <div key={id} className="col">

                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                                        <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title">{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text">Number: {pokemon.id}</p>
                                            <p className="card-text">Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon.stats.map((stat, index) => (
                                                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )) : pokemonRes && pokemonRes.map((pokemon, id) => (
                        <div key={id} className="col">

                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                                        <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title">{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text">Number: {pokemon.id}</p>
                                            <p className="card-text">Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon.stats.map((stat, index) => (
                                                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                                                ))}
                                            </ul>

                                            <button type="button" class="btn btn-danger" onClick={() => handleaddtopokedex(pokemon.id, pokemon.name)} >Ajouter aux Pokédex</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}

export default CardItems;

