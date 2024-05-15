import React from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { GiFairyWand } from "react-icons/gi";
import { FaBug } from "react-icons/fa";
import { GiLibertyWing } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";
import { GiPsychicWaves } from "react-icons/gi";
import { GiSteelClaws } from "react-icons/gi";
import { RiEmotionNormalFill } from "react-icons/ri";
import { GiHighGrass } from "react-icons/gi";
import { GiColdHeart } from "react-icons/gi";
import { PiHandFistLight } from "react-icons/pi";
import { GiPoisonGas } from "react-icons/gi";
import { GiWoodPile } from "react-icons/gi";
import { FaDiceD20 } from "react-icons/fa";
import { GiSpikedDragonHead } from "react-icons/gi";
import { MdOutlineDarkMode } from "react-icons/md";
import { SiGhostery } from "react-icons/si";

















export const transformStyle = (typeName) => {
    switch (typeName) {
        case 'water':
            return 'type-water';
        case 'fairy':
            return 'type-fairy';
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
 




export const transform = (type) => {
    let backgroundColor;
    switch (type.toLowerCase()) { // convertir le type en minuscule pour éviter les problèmes de casse
        case 'normal':
            backgroundColor = '#A8A77A';
            break;
        case 'fire':
            backgroundColor = '#EE8130';
            break;
        case 'water':
            backgroundColor = '#6390F0';
            break;
        case 'electric':
            backgroundColor = '#F7D02C';
            break;
        case 'grass':
            backgroundColor = '#7AC74C';
            break;
        case 'ice':
            backgroundColor = '#96D9D6';
            break;
        case 'fighting':
            backgroundColor = '#C22E28';
            break;
        case 'poison':
            backgroundColor = '#A33EA1';
            break;
        case 'ground':
            backgroundColor = '#E2BF65';
            break;
        case 'flying':
            backgroundColor = '#A98FF3';
            break;
        case 'psychic':
            backgroundColor = '#F95587';
            break;
        case 'bug':
            backgroundColor = '#A6B91A';
            break;
        case 'rock':
            backgroundColor = '#B6A136';
            break;
        case 'ghost':
            backgroundColor = '#735797';
            break;
        case 'dragon':
            backgroundColor = '#6F35FC';
            break;
        case 'dark':
            backgroundColor = '#705746';
            break;
        case 'steel':
            backgroundColor = '#B7B7CE';
            break;
        case 'fairy':
            backgroundColor = '#D685AD';
            break;
        default:
            backgroundColor = 'grey';
            break;
    }
    return { backgroundColor };
};


export const addSymbole = (typeName) => {
    switch (typeName) {
        case 'water':
            return <IoIosWater />;
        case 'fairy':
            return <GiFairyWand />;
        case 'bug':
            return <FaBug />;
        case 'flying':
            return <GiLibertyWing />;
        case 'fire':
            return <FaFireFlameCurved />;
        case 'electric':
            return  <MdElectricBolt />;
        case 'psychic':
            return <GiPsychicWaves />;
        case 'steel':
            return <GiSteelClaws />;
        case 'normal':
            return <RiEmotionNormalFill />;
        case 'grass':
            return <GiHighGrass />;
        case 'ice':
                return <GiColdHeart />;
        case 'fighting':
            return <PiHandFistLight />;
        case 'poison':
            return <GiPoisonGas />;
        case 'ground':
            return <GiWoodPile />;
        case 'rock':
            return <FaDiceD20 />;
        case 'dragon':
            return <GiSpikedDragonHead />;
        case 'dark':
            return <MdOutlineDarkMode />
        case 'ghost':
            return  <SiGhostery />
        default:
            return '';
    }
};