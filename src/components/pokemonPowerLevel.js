import React from "react";

const getPowerLevel = (totalStats) => {
        if (totalStats <= 210) {
            return "❄️ Nul"; // Cold
        } else if (totalStats <= 500) {
            return "🔥 Fort"; // Hot
        } else if (totalStats <= 1500) {
            return "🔥🔥 Tres fort"; // Super Hot
        } else if (totalStats <= 2000) {
            return "👑 Boss"; // King
        } else if (totalStats <= 2500) {
            return "🔥🔥🔥 Antagoniste"; // Fire
        } else if (totalStats <= 8000) {
            return "💀 "; // Dead
        } else {
            return "🔥🔥🔥🔥 Niveau Dieu"; // Extremely hot
        }
    };

    export default getPowerLevel