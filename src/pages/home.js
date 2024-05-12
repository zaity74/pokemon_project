import React, { useEffect } from "react"; 
import axios from 'axios';

function Home() {

    // Effects
    useEffect(() => {
        const fetchData = async () => { 
            try {
                const response = await axios.get(`https://pokeapi.co/`); 
                console.log(response.data); // Vous pouvez gérer la réponse ici
            } catch(error) {
                console.error('Error fetching data:', error); // Gestion des erreurs
            }
        };

        fetchData(); // Appel de la fonction fetchData
    }, []); // Le tableau vide signifie que ce code ne s'exécute qu'une seule fois lors du montage du composant

    return (
        <div>
            <h1>bonjour</h1>
        </div>
    );
}

export default Home;
