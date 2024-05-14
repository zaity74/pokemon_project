
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import SearchForm from "./form";
import { Alert } from "bootstrap";
import Navbar from "./navebar";
import transform from "./pokemonTypeColor";



function CardItems() {
    //State
    const [pokemonRes, setPokemonRes] = useState([]);
    const [isAdded, setIsAdded] = useState({});
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

    // Récupérer isAdded du localStorage lors du chargement de la page
    useEffect(() => {
        const savedIsAdded = JSON.parse(localStorage.getItem("isAdded"));
        if (savedIsAdded) {
            setIsAdded(savedIsAdded);
        }
    }, []);
    
    
  

    const handleaddtopokedex = (id, name) => {
        if (pokedex.some(pokemon => pokemon.id === id)) {
            alert('le pokemon a déjà été ajouté au pokedex');
            return;
        }
    
        const pokemonToAdd = pokemonRes.find(pokemon => pokemon.id === id);
    
        try {
            // Vérifier la taille actuelle du localStorage
            const currentStorageSize = JSON.stringify(localStorage).length;
        
            // Taille approximative du nouvel ID ajouté
            const idSize = JSON.stringify({ id }).length;
        
            // Limite de stockage maximale (5 Mo)
            const maxStorageSize = 5 * 1024 * 1024; // 5 Mo en octets
        
            // Vérifier si l'ajout du nouvel ID dépasse la limite de stockage
            if (currentStorageSize + idSize > maxStorageSize) {
                // Vider le localStorage
                localStorage.clear();
                // Vider également addedPokemons
                alert("La limite de stockage du localStorage a été atteinte. Le pokedex a été vidé.");
                return;
            }
        
            // Ajouter au localStorage
            const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
            localStorage.setItem("pokedex", JSON.stringify([...storedPokedex, pokemonToAdd]));
        
            // Ajouter l'ID du Pokémon ajouté à isAdded
            setIsAdded(prevIsAdded => {
                const newIsAdded = { ...prevIsAdded, [id]: true };
                localStorage.setItem("isAdded", JSON.stringify(newIsAdded));
                return newIsAdded;
            });
        
            alert("Le Pokemon " + name + " a été ajouté au pokedex avec succès.");
        } catch (error) {
            // Gérer l'erreur
            console.error("Erreur lors de l'ajout au localStorage :", error);
            alert("Une erreur est survenue lors de l'ajout au pokedex. Veuillez réessayer plus tard.");
        }
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
                                        <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid" style={{ objectFit: 'cover', width: '80px' }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title">{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text cardNum">{pokemon.id}</p>
                                            <p className="card-text">Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon.stats.map((stat, index) => (
                                                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                                                ))}
                                            </ul>
                                            <button 
                                                type="button" 
                                                className={isAdded[pokemon.id] ? "btn btn-success" : "btn btn-danger"} 
                                                onClick={() => handleaddtopokedex(pokemon.id, pokemon.name)} 
                                            >
                                                Ajouter aux Pokédex
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )) : pokemonRes && pokemonRes.map((pokemon, id) => (
                        <div key={id} className="col">

                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex align-items-center justify-content-center relative-pos">
                                        <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid pokemon-img" style={{ objectFit: 'cover'}} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title">{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text cardNum">{pokemon.id}</p>
                                            {/* <p className="card-text" >Types: {pokemon.types.map((type) => type.type.name ).join(', ')}</p> */}
                                            <p className="card-text">
                                                Types: {pokemon.types.map((type, index) => (
                                                    <span key={index} className={transform(type.type.name)}>{type.type.name}</span>
                                                ))}
                                            </p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon.stats.map((stat, index) => (
                                                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                                                ))}
                                            </ul>

                                            <button 
                                                type="button" 
                                                className={isAdded[pokemon.id] ? "btn btn-success" : "btn btn-danger"} 
                                                onClick={() => handleaddtopokedex(pokemon.id, pokemon.name)} 
                                            >
                                                Ajouter aux Pokédex
                                            </button>
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

