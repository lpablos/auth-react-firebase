import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'

const Login = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = e => {
        e.preventDefault()
        if( !correo.trim() ) {            
            setError("Ingresa correo")
            return
        }
        if( !password.trim() ) {            
            setError("Ingregsa la contraseña")
            return
        }
        if( password.length < 6 ){            
            setError('Constraseña mayor a 6 caracteres')
            return
        }
        setError(null)
        if(esRegistro){
            Registrar()
        }

    }

    const Registrar = useCallback (
        async () => {
            await auth.createUserWithEmailAndPassword(correo, password)
            .then((userCredential) => {
                console.log(userCredential)
                setError(null)
            })
            .catch((error) => {
                console.log(error);
                if(error.code === 'auth/invalid-email'){
                    setError('Correo invalido')
                }
                if(error.code === 'auth/email-already-in-use'){
                    setError('El correo ya ha fue utilizado')
                }
            });
        },[correo, password])

    return (
        <div class="mt-2">
            
            <div class="mb-3">
                <h3 class="text-center">
                    {
                        esRegistro 
                        ? 'Registro de usuario'
                        : 'Inicio se sessión'
                    }
                </h3>
                <div class="row justify-content-center ">
                    <div class="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit={procesarDatos}>
                            {
                                error && (
                                    <div class="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )
                            }                           
                             <input type="email" class="form-control mb-2" value={ correo }  onChange={ e => setCorreo(e.target.value) } placeholder="Ingrese un Email"/>
                             <input type="password" class="form-control mb-2" value={ password } onChange={ e=> setPassword(e.target.value)} placeholder="Contraseña"/>
                             <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-dark btn-lg">
                                    {
                                        esRegistro
                                        ? 'Registrar'
                                        : 'Acceder'
                                    }
                                </button>
                                <button 
                                    type="button"
                                    class="btn btn-info btn-lg btn-sm"
                                    onClick={ ()=>setEsRegistro(!esRegistro)}>
                                        {
                                            esRegistro
                                            ? '¿ Ya tienes cuenta ?'
                                            : '¿ No tienes cuenta ?'
                                        }
                                </button>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
