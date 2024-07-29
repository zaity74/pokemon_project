import React, { useState } from "react";
import { IoIosOptions } from "react-icons/io";

function BtnFilter({ pokemons, setFilteredPokemons, filteredPokemons }) {

    // State
    const [selectedType, setSelectedType] = useState('');

    // Function filter 
    const handleFilterByType = (type) => {
        setSelectedType(type);

        const filteredPokemon = pokemons.filter((pokemon) => {
            return pokemon.types.some((pokemonType) => pokemonType.type.name === type);
        });

        setFilteredPokemons(filteredPokemon);
    };

    // Function to handle unchecking the input
    const handleUncheck = () => {
        setSelectedType(''); // Reset the selectedType
        setFilteredPokemons(pokemons); // Reset filteredPokemons to the original list of pokemons
    };

    // Créer un ensemble de types uniques
    const uniqueTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.types.map((type) => type.type.name)))];

    return (
        <div className="container typeFilter">
            <p>
            <IoIosOptions /> Filtrer par types : </p>
            {uniqueTypes.map((type) => (
                <label key={type}>
                    <input
                        type="checkbox" // Changez le type de radio à checkbox
                        name={type} // Utilisez le nom pour regrouper les checkbox
                        value={type}
                        checked={selectedType.includes(type)} // Vérifiez si le type est déjà sélectionné
                        onChange={() => {
                            if (selectedType.includes(type)) {
                                handleUncheck(); // Call handleUncheck if the input is unchecked
                            } else {
                                handleFilterByType(type); // Call handleFilterByType if the input is checked
                            }
                        }}
                    />
                    {type}
                </label>
            ))}
            <p className="info">( Il y'a {filteredPokemons.length > 0 ? filteredPokemons.length : pokemons.length}  {selectedType === '' ? 'pokemons au total' : 'de types' +  ' ' + selectedType} ) </p>
        </div>
    );
}

export default BtnFilter;
