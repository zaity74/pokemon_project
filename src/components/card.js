import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import SearchForm from "./form";
import { Alert } from "bootstrap";
import { transform, transformStyle, addSymbole } from "./pokemonTypeColor";
import { FaRandom } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import BtnFilter from "./btnFilter";

function CardItems({ setPokedexCount, pokedexCount, storedPoke }) {
    // State
    const [pokemonRes, setPokemonRes] = useState([]);
    const [isAdded, setIsAdded] = useState({});
    const [loading, setLoading] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokedex, setPokedex] = useState([]);

    // Fetch Pokémon data
    useEffect(() => {
        const fetchPokemonData = async (url) => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Erreur lors de la récupération des données pour ${url}:`, error);
                throw error;
            }
        };

        const fetchData = async () => {
            try {
                const firstRes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                const pokemonStartData = firstRes.data.results;

                const pokemonDetailPromises = pokemonStartData.map(pokemon => fetchPokemonData(pokemon.url));
                const pokemonDetail = await Promise.all(pokemonDetailPromises);

                setPokemonRes(pokemonDetail);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Vérifier si le tableau pokedex dans le localStorage est vide
        const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
        if (storedPokedex.length === 0) {
            // Si le tableau pokedex est vide, définir isAdded à false
            setIsAdded({});
            // Vider également le tableau isAdded dans le localStorage
            localStorage.removeItem("isAdded");
        }
    }, []);

    useEffect(() => {
        // Récupérer isAdded du localStorage lors du chargement de la page
        const savedIsAdded = JSON.parse(localStorage.getItem("isAdded"));
        if (savedIsAdded) {
            setIsAdded(savedIsAdded);
        }
    }, []);

    // Ajout au pokedex
    const handleaddtopokedex = (pokemonId, pokemonName) => {
        // Vérifier si le Pokémon est déjà présent dans le Pokédex
        const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
        const pokemonAlreadyAdded = storedPokedex.some(pokemon => pokemon.id === pokemonId);

        // Si le Pokémon est déjà présent, afficher un message d'alerte et arrêter la fonction
        if (pokemonAlreadyAdded) {
            alert(`Le Pokemon ${pokemonName} est déjà présent dans le Pokédex. ❌`);
            return;
        }

        const pokemonData = pokemonRes.find(pokemon => pokemon.id === pokemonId);
        const { id, name, types, sprites, stats } = pokemonData;
        const pokemonToAdd = { id, name, types, sprites, stats };

        // Update PokedexCount 
        if (!pokemonAlreadyAdded) {
            setPokedexCount(pokedexCount + 1);
        }
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
            localStorage.setItem("pokedex", JSON.stringify([...storedPokedex, pokemonToAdd]));

            // Ajouter l'ID du Pokémon ajouté à isAdded
            setIsAdded(prevIsAdded => {
                const newIsAdded = { ...prevIsAdded, [id]: true };
                localStorage.setItem("isAdded", JSON.stringify(newIsAdded));
                return newIsAdded;
            });

            alert("Le Pokemon " + pokemonName + " a été ajouté au pokedex avec succès. 🔥🔥");
        } catch (error) {
            // Gérer l'erreur
            console.error("Erreur lors de l'ajout au localStorage :", error);
            alert("Une erreur est survenue lors de l'ajout au pokedex. Veuillez réessayer plus tard.");
        }
    }

    // Ajout aleatoire au pokedex
    const addRandomPokemons = () => {
        // Vérifier si le Pokédex est vide
        const storedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
        if (storedPokedex.length > 0) {
            return; // Si le Pokédex n'est pas vide, ne rien faire
        }

        // Ajouter 12 Pokémon aléatoires
        const randomPokemonIds = Array.from({ length: 12 }, () => Math.floor(Math.random() * pokemonRes.length) + 1); // IDs aléatoires entre 1 et pokemonRes.length
        const randomPokemons = pokemonRes.filter(pokemon => randomPokemonIds.includes(pokemon.id));

        console.log(randomPokemons, 'show me random');

        // Extraire les IDs des pokemons aléatoires
        const randomPokemonIdsArray = randomPokemons.map(pokemon => pokemon.id);

        // Update PokedexCount 
        if (randomPokemons.length > 0) {
            setPokedexCount(randomPokemons.length);
        }

        try {
            // Mettre à jour le localStorage et le state
            localStorage.setItem('pokedex', JSON.stringify(randomPokemons));
            setPokedex(randomPokemons);

            alert('Vos pokémon ont été ajouter aléatoirement au Pokédex ! 🫡')

            // Construire un objet avec chaque ID de pokemon renvoyant true
            const newIsAdded = {};
            randomPokemonIdsArray.forEach(id => {
                newIsAdded[id] = true;
            });

            setIsAdded(prevIsAdded => {
                const updatedIsAdded = { ...prevIsAdded, ...newIsAdded }; // Fusionner avec l'état précédent
                localStorage.setItem("isAdded", JSON.stringify(updatedIsAdded));
                return updatedIsAdded;
            });

            return randomPokemonIdsArray;
        } catch (error) {
            // Gérer l'erreur
            console.error("Erreur lors de l'ajout au localStorage :", error);
            alert("Une erreur est survenue lors de l'ajout au pokedex. Veuillez réessayer plus tard.");
            return []; // En cas d'erreur, renvoyer un tableau vide
        }
    };

    // Affichage
    return (
        <div className="container">
            <SearchForm pokemons={pokemonRes} setFilteredPokemons={setFilteredPokemons} />
            <div className="section-action">
                <Link onClick={addRandomPokemons}><FaRandom /> Ajout aleatoire</Link>
                <BtnFilter pokemons={pokemonRes} setFilteredPokemons={setFilteredPokemons} filteredPokemons={filteredPokemons} />
            </div>
            {loading ? (
                <p className="text-center">Page Loading...</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3">
                    {filteredPokemons.length > 0 ? filteredPokemons.map((pokemon, id) => (
                        <div key={id} className="col">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="align-items-center justify-content-center relative-pos">
                                        <img src={pokemon?.sprites?.front_default} alt="pokemon image" className="img-fluid pokemon-img" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-8 texte">
                                        <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title">{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text cardNum" data-num={pokemon.id}>{pokemon.id}</p>
                                            <p className="card-text">
                                                Types: {pokemon && pokemon.types.map((type, index) => (
                                                    <span key={index} style={transform(type.type.name)} className={transformStyle(type.type.name)}>
                                                        {addSymbole(type.type.name)}{type.type.name}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon && pokemon.stats.map((stat, index) => (
                                                    <li key={index}>
                                                        <IoMdArrowDropright /><p style={{ fontWeight: 600 }}>{stat.stat.name}:</p> {stat.base_stat}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button 
                                                type="button" 
                                                className={isAdded[pokemon.id] ? "btn btn-success" : "btn btn-danger"} 
                                                onClick={() => handleaddtopokedex(pokemon.id, pokemon.name)} 
                                            >
                                                <BsPlusLg />
                                                Ajouter aux Pokédex
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : 
                    pokemonRes.map((pokemon, id) => (
                        <div key={id} className="col">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="align-items-center justify-content-center relative-pos">
                                        <img src={pokemon && pokemon.sprites.front_default} alt="pokemon image" className="img-fluid pokemon-img" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-8 texte">
                                        <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                            <Link to={`/pokemon/${pokemon.id}`}>
                                                <h5 className="card-title" style={{ zIndex: 20 }}>{pokemon.name}</h5>
                                            </Link>
                                            <p className="card-text cardNum" data-num={pokemon.id}>{pokemon.id}</p>
                                            <p className="card-text">
                                                Types: {pokemon && pokemon.types.map((type, index) => (
                                                    <span key={index} style={transform(type.type.name)} className={transformStyle(type.type.name)}>{addSymbole(type.type.name)}{type.type.name}</span>
                                                ))}
                                            </p>
                                            <p className="card-text">Stats:</p>
                                            <ul>
                                                {pokemon && pokemon.stats.map((stat, index) => (
                                                    <li key={index}>
                                                        <IoMdArrowDropright /> <p style={{ fontWeight: 600 }}>{stat.stat.name}:</p> {stat.base_stat}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button 
                                                type="button" 
                                                className={isAdded[pokemon.id] ? "btn btn-success" : "btn btn-danger"} 
                                                onClick={() => handleaddtopokedex(pokemon.id, pokemon.name)} 
                                            >
                                                <BsPlusLg />
                                                Ajouter aux Pokédex
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardItems;
