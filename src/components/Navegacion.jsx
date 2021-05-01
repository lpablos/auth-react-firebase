import React from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'


const Navegacion = (props) => {
    
    const cerrarSession = ()=> {
        auth.signOut().then(()=>{
            props.history.push('/login')
        })
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">           
            <div class="container-fluid">   
                
                <span class="navbar-brand mb-0 h1">
                    <img src="https://ih1.redbubble.net/image.1085917622.8337/st,small,845x845-pad,1000x1000,f8f8f8.jpg" alt="" width="35em" height="35em" /> 
                </span>            
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">                
                    <ul class="nav   navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link mr-2" to="/">Inicio</Link>
                        </li>
                        {
                            props.firebaseUser !== null 
                            ?(
                                <li class="nav-item">
                                    <Link class="nav-link mr-2" to="/admin">Administracion</Link>
                                </li>
                            ):(null)
                        }
                      
                        {
                           props.firebaseUser !== null
                            ?(<button type="button" onClick={cerrarSession} class="btn btn-dark">Cerrar Sesión</button>)
                            :(
                                <li class="nav-item">
                                    <Link class="nav-link mr-2" to="/login">Login</Link>
                                </li>
                            )
                        }
                        
                    
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navegacion)
