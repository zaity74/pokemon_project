import React, { useState } from "react";


function SearchForm({ pokemons, setFilteredPokemons }) {
    const [term, setTerm] = useState('');

    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setTerm(searchTerm);

        const filteredPokemons = pokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchTerm); // Filtrer par la première lettre
        });

        setFilteredPokemons(filteredPokemons);
    }

    return (
        <div className="container">
            <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={handleInputChange} className="form-control mb-3" />
        </div>
    );
}

export default SearchForm;

