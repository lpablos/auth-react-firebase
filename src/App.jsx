import Navegacion from './components/Navegacion'
import Login from './components/Login'
import Admin from './components/Admin'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [firebaseUser, setFirebaseUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
    auth.onAuthStateChanged((user) => {
      user
        ?setFirebaseUser(user)
        :setFirebaseUser(null)      
      setLoading(true)
    })   
  }, [])

  return (loading) 
  // we have data of user since firebase
  ?(
    <Router>
      <div class="container">
        <Navegacion firebaseUser={firebaseUser}/>
        <Switch>
          <Route path="/" exact>
            <h3>Inicio</h3>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
  // we don't have data of user since firebase
  :('Cargando ...');
}

export default App;
