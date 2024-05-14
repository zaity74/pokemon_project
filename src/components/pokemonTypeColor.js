import React from "react";

const transform = (typeName) => {
    switch (typeName) {
        case 'water':
            return 'type-water';
        case 'bug':
            return 'type-bug';
        case 'flying':
            return 'type-flying';
        case 'fire':
            return 'type-fire';
        case 'electric':
            return 'type-electric';
        case 'psychic':
            return 'type-psychic';
        case 'steel':
            return 'type-steel';
        case 'normal':
            return 'type-normal';
        case 'grass':
            return 'type-grass';
        case 'ice':
                return 'type-ice';
        case 'fighting':
            return 'type-fighting';
        case 'poison':
            return 'type-poison';
        case 'ground':
            return 'type-ground';
        case 'rock':
            return 'type-rock';
        case 'dragon':
            return 'type-dragon';
        case 'dark':
            return 'type-dark';
        case 'ghost':
                return 'type-ghost';
        default:
            return '';
    }
};
 


export default transform;