import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

function SearchForm({ pokemons, setPokemons }) {
    // State 
    const [term, setTerm] = useState('');
    const location = useLocation();

    const handleInputChange = (e) => {
        const term = e.target.value.toLowerCase(); // Convertit le terme en minuscules
        setTerm(term);

        // if (term.length <= 1) {
        //     // Si le terme est vide ou a une seule lettre, réinitialise la liste des Pokémon
        //     setPokemons([]);
        //     return;
        // }

        const searchparam = new URLSearchParams(location.search);
        const letter = searchparam.get("letter");

        // Filtrer les Pokémon en fonction du terme de recherche et de la lettre spécifiée dans l'URL
        const filteredPokemons = pokemons.filter((pokemon) => {
            if (term === letter) {
                return !letter || pokemon.name.startsWith(letter.toLowerCase());
            } else {
                return pokemon.name.toLowerCase().includes(term);
            }
        });

        // Mettre à jour la liste des Pokémon filtrés
        setPokemons(filteredPokemons);
    }

    return (
        <div>
            <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={handleInputChange} />
        </div>
    );
}

export default SearchForm;
