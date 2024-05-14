import { Link } from 'react-router-dom';

// Hooks
import React, { useState, useEffect } from "react";


function Navbar(props) {
    // State


    // Function


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white' }}>
                <div className="container"> {/* Wrap everything in a container to center the content */}
                    <img className="navbar-brand mr-auto" src="https://logospng.org/download/pokemon/pokemon-1024.png" style={{ width: '180px', height: 'auto' }} />

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-5"> {/* Align the list items to the left with a margin of 60px */}
                        <li className="nav-item active">
                        <Link className="nav-link" to={"/"} style={{ fontSize: '1.3rem', color: "black", fontWeight: "400" }}>Pokemons<span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/pokedex"} style={{ fontSize: '1.3rem', color: "black", fontWeight: "400" }}>Pokedex</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>


        </>
    )
}

export default Navbar;