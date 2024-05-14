import React, { useEffect, useState } from "react";
import CardItems from "../components/card";
import { Form } from "react-router-dom";

function Home() {
    // State 

    // Effects

    return (

        <div>
            <form />
            <nav>
                <div className="nav-wrapper teal">
                    <a href="#" className="brand-logo center">Pokédox</a>
                </div>
            </nav>
            <div>
                <h1 style={{ textAlign: 'center' }}>Liste des pokémons</h1>
            </div>
            <CardItems />
        </div>
    );
}

export default Home;
