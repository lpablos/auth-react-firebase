import React, { useState, useCallback } from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(false)

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
        }else{
            Accesar()
        }

    }

    const Registrar = useCallback (
        async () => {
            await auth.createUserWithEmailAndPassword(correo, password)
            .then((userCredential) => {
                
                db.collection("usuarios").doc(userCredential.user.email).set({
                    email: userCredential.user.email,
                    uid: userCredential.user.uid
                })
                .then(() => {                    
                    setCorreo('')
                    setPassword('')
                    setError(null)
                    props.history.push('/admin')
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                db.collection(userCredential.user.uid).add({
                    name: "Tokyo",
                    fecha: Date.now()
                })
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
        },[correo, password, props.history])

    const Accesar = useCallback(async () => {
        await auth.signInWithEmailAndPassword(correo, password)
        .then((userCredential) => {
          console.log("Entro", userCredential);
          setCorreo('')
          setPassword('')
          setError(null)
          props.history.push('/admin')
        })
        .catch((error) => {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Correo invalido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('El correo ya ha fue utilizado')
            }
            if(error.code === 'auth/user-not-found'){
                setError('No existe la cuenta registrada')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Constraseña invalida')
            }
        });
        },[correo, password, props.history])

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

export default withRouter(Login)
