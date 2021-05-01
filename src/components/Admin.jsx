import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Admin = (props) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }
    }, [props.history])
    return (
        <div>
            <pre>
                Hola
            </pre>
        </div>
    )
}

export default withRouter(Admin)
