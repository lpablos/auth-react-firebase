import React, { useState } from 'react'

const Login = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError] = useState(null)

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
        console.log('pasando las validaciones');

    }
    return (
        <div class="mt-2">
            
            <div class="mb-3">
                <h3 class="text-center">Acceso o Regstio de Usuarios</h3>
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
                                <button type="submit" class="btn btn-dark btn-lg"> Registrarse</button>
                                <button class="btn btn-info btn-lg btn-sm"> ¿ Tienes cuenta ?</button>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
