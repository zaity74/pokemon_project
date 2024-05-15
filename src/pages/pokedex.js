
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import SearchForm from "../components/form";
import Navbar from "../components/navebar";
import { transform, transformStyle, addSymbole } from "../components/pokemonTypeColor";
import getPowerLevel from "../components/pokemonPowerLevel";
import getPokedexLevel from "../components/pokedexLevel";

function Pokedex() {
    // State 
    const storedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
    const [pokedexCount, setPokedexCount] = useState(null) || '';

    const [pokedex, setPokedex] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPokedex, setFilteredPokedex] = useState([])




    // Effects 
    useEffect(() => {

        //permet de recuperer les donnees de storepokdex pour les ajouter dans pokedex
        if (storedPokedex) {
            setPokedex(storedPokedex)
            setLoading(false);
            console.log(pokedex);
        }
    }, [])

    //Function : supprimer le pokedex cliquez 

    const removeFromPokedex = (id) => {
        const updatePokedex = pokedex.filter(pokemon => pokemon.id !== id)
        setPokedex(updatePokedex);
    
        // Supprimer l'ID de l'élément supprimé du tableau isAdded dans le localStorage
        const savedIsAdded = JSON.parse(localStorage.getItem("isAdded"));
        if (savedIsAdded) {
            delete savedIsAdded[id];
            localStorage.setItem("isAdded", JSON.stringify(savedIsAdded));
        }
        // Mettre à jour le tableau pokedex dans le localStorage
        localStorage.setItem("pokedex", JSON.stringify(updatePokedex));

        // Update PokedexCount 
        if (!pokedex[id] ) {
            setTimeout(() => setPokedexCount(pokedexCount - 1), 600)
               
        }
    }
    


    //Function : supprimer toute les pokedex

    const cliePokedex = () => {
        setPokedex([]);
        localStorage.removeItem("pokedex");
        localStorage.removeItem("isAdded");
        setPokedexCount(0);   
    }

    // Function : Total Stats 
     const calculateTotalStats = (stats) => {
        return stats.reduce((total, stat) => total + stat.base_stat, 0);
    };






    //Affichage 

    return (
    <>
        <Navbar storedPokedex={storedPokedex} pokedexCount={pokedexCount} setPokedexCount={setPokedexCount} />
        <br></br>
        <br></br>
        <div>
            <h1 style={{ textAlign: 'center' }}>
                <span className="styledTitle">Mon Pokedex </span> : {getPokedexLevel(storedPokedex)}</h1>
        </div>
        <div className="container">
            <SearchForm pokemons={pokedex} setFilteredPokemons={setFilteredPokedex} />

            <Link onClick={cliePokedex}><FaRegTrashAlt />Vider le pokedex</Link>

            {loading ? (
                <p className="text-center">Page Loading...</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3">
                        {
                            filteredPokedex.length > 0 ? filteredPokedex.map((pokemon, id) => (
                                <div key={id} className="col">
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="align-items-center justify-content-center relative-pos">
                                                <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid pokemon-img" style={{ objectFit: 'cover', zIndex: 1 }} />
                                            </div>
                                            <div className="col-md-8 texte">
                                                <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                                    <Link to={`/pokemon/${pokemon.id}`}>
                                                        <h5 className="card-title">{pokemon.name}</h5>
                                                    </Link>
                                                    <p className="card-text cardNum" data-num={pokemon.id}>{pokemon.id}</p>
                                                    <p className="card-text">
                                                        Types: {pokemon.types.map((type, index) => (
                                                            <span key={index} className={transformStyle(type.type.name)} style={transform(type.type.name)}>{addSymbole(type.type.name)}{type.type.name}</span>
                                                        ))}
                                                    </p>
                                                    <p className="card-text">
                                                        Total Power: {calculateTotalStats(pokemon.stats)} {getPowerLevel(calculateTotalStats(pokemon.stats))}
                                                    </p>
                                                    <Link className="delete-btn" onClick={() => removeFromPokedex(pokemon.id)}><FaRegTrashAlt /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : storedPokedex && storedPokedex.length > 0 ? storedPokedex.map((pokemon, id) => (
                                <div key={id} className="col">
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="align-items-center justify-content-center relative-pos">
                                                <img src={pokemon.sprites.front_default} alt="pokemon image" className="img-fluid pokemon-img" style={{ objectFit: 'cover', zIndex: 1 }} />
                                            </div>
                                            <div className="col-md-8 texte">
                                                <div className="card-body pos-absolute" style={{ marginLeft: '20px' }}>
                                                    <Link to={`/pokemon/${pokemon.id}`}>
                                                        <h5 className="card-title" style={{ zIndex: 20 }}>{pokemon.name}</h5>
                                                    </Link>
                                                    <p className="card-text cardNum" data-num={pokemon.id}>{pokemon.id}</p>
                                                    <p className="card-text">
                                                        Types: {pokemon.types.map((type, index) => (
                                                            <span key={index} className={transformStyle(type.type.name)} style={transform(type.type.name)}>{addSymbole(type.type.name)}{type.type.name}</span>
                                                        ))}
                                                    </p>
                                                    <p className="card-text">
                                                        Total Power: {calculateTotalStats(pokemon.stats)} {getPowerLevel(calculateTotalStats(pokemon.stats))}
                                                    </p>
                                                    <Link className="delete-btn" onClick={() => removeFromPokedex(pokemon.id)}><FaRegTrashAlt /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <p>Le pokedex est vide !!!</p>
                        }

                </div>
              
            )
            }
        </div >
    
    </>
    );
}

export default Pokedex;
