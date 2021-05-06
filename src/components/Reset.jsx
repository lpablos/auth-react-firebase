import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Reset = (props) => {
    const [correo, setCorreo] = useState('')
    const [error, setError] = useState('')
    const procesarDatos = e => {
        e.preventDefault()
        if( !correo.trim() ) {            
            setError("Ingresa correo")
            return
        }      
        setError(null)      
        recuperar() 
    }

    const  recuperar = useCallback(async () => {
            try {
                await auth.sendPasswordResetEmail(correo)
                setError('');
                props.history.push('/login')

            } catch (error) {
                if(error.code === 'auth/user-not-found'){
                    setError('El usuario no se encuentra registrado')
                }
            }
        },
        [correo, props.history])

    return (
        <div class="mt-3">
            <div class="row justify-content-center text-center">
                    <h3>Reiniciar Contraseña</h3>
                <div class="col-12 col-sm-8 col-md-6 col-xl-4 mt-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )
                        }                           
                            <input type="email" 
                                class="form-control mb-2" 
                                value={ correo }  
                                onChange={ e => setCorreo(e.target.value) } 
                                placeholder="Ingrese un Email"/>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-dark btn-lg">Reiniciar Contraseña</button>                         
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
    