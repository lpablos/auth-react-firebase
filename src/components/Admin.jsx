import React, { useEffect, useState } from 'react'
import Firestore from './Firestore'
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
    }, [user, props.history])

    return (
        <div>
            <pre>
                {
                    user && (<Firestore user={user}/>)
                }
            </pre>
        </div>
    )
}

export default withRouter(Admin)
