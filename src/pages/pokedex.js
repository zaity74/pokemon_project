
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import SearchForm from "../components/form";
import Navbar from "../components/navebar";

function Pokedex() {
    // State 
    const storedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

    const [pokedex, setPokedex] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPokedex, setFilteredPokedex] = useState([])




    // Comportment 
    useEffect(() => {

        //permet de recuperer les donnees de storepokdex pour les ajouter dans pokedex
        if (storedPokedex) {
            setPokedex(storedPokedex)
            setLoading(false);
            console.log(pokedex);
        }
    }, [])

    //supprimer le pokedex cliquez 

    const removeFromPokedex = (id) => {
        const updatePokedex = pokedex.filter(pokemon => pokemon.id !== id)
        setPokedex(updatePokedex);

        localStorage.setItem("pokedex", JSON.stringify(updatePokedex));

    }


    //supprimer toute les pokedex

    const cliePokedex = () => {
        setPokedex([]);
        localStorage.removeItem("pokedex");
    }






    //Affichage 

    return (
    <>
        <Navbar />
        <br></br>
        <br></br>
        <div>
            <h1 style={{ textAlign: 'center' }}>Mon Pokedex</h1>
        </div>
        <div className="container">
            <SearchForm pokemons={pokedex} setFilteredPokemons={setFilteredPokedex} />

            <Link onClick={cliePokedex}><FaRegTrashAlt />Vider le pokedex</Link>

            {loading ? (
                <p className="text-center">Page Loading...</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3">
                    {filteredPokedex.length > 0 ? filteredPokedex.map((pokemon, id) => (
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
                                            <Link onClick={() => removeFromPokedex(pokemon.id)}><FaRegTrashAlt /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )) : storedPokedex.length > 0 ? storedPokedex.map((pokemon, id) => (
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

                                            <Link onClick={() => removeFromPokedex(pokemon.id)}><FaRegTrashAlt /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )) : <p>Le pokedex est vide !!!</p>}
                </div>
            )
            }
        </div >
    
    </>
    );
}

export default Pokedex;
