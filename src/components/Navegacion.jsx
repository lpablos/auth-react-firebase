import React from 'react'
import { Link } from "react-router-dom";

const Navegacion = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link mr-2" to="/">Inicio</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link mr-2" to="/login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link mr-2" to="/admin">Administracion</Link>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
    )
}

export default Navegacion
