import { Link } from 'react-router-dom';

// Hooks
import React, { useState, useEffect } from "react";


function Navbar(props) {
    // State


    // Function


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'green' }}>
                <div className="container"> {/* Wrap everything in a container to center the content */}
                    <img className="navbar-brand mr-auto" src="https://logospng.org/download/pokemon/pokemon-1024.png" style={{ width: '200px', height: 'auto' }} />


                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto"> {/* Center the list items */}
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"} style={{ fontSize: '2em', color: "white", fontWeight: "600" }} >Pokemons<span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/pokedex"} style={{ fontSize: '2em', color: "white", fontWeight: "600" }}>Pokedex</Link>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )
}

export default Navbar;