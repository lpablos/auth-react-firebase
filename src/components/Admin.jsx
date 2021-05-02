import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Admin = (props) => {

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if(auth.currentUser){
        
            setUser(auth.currentUser)
            console.log(user);
        }else{
            props.history.push('/login')
        }
    }, [user, props.history])

    return (
        <div>
            <pre>
                {
                    user && (<h3> {user.email}</h3>)
                }
            </pre>
        </div>
    )
}

export default withRouter(Admin)
