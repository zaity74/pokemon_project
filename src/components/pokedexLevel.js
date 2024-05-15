const getPokedexLevel = (pokedex) => {
    if (pokedex.length === 0) return "Aucun Pokémon";

    const highStatCount = pokedex.filter(pokemon => {
        const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
        return totalStats > 500;
    }).length;

    const percentage = (highStatCount / pokedex.length) * 100;

    if (percentage >= 100) {
        return "est Invincible 🥊";
    } else if (percentage >= 80) {
        return "est Très bon ⬆️";
    } else if (percentage >= 50) {
        return "est Bon ↗️";
    } else if (percentage >= 20) {
        return "est Moyen ➡️";
    } else {
        return "est Faible ↘️";
    }
};

export default getPokedexLevel