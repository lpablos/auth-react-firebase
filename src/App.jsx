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

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      (user)
        // User is signed in.
        ?setFirebaseUser(user)
        // No user is signed in.
        :setFirebaseUser(null)      
    })   
  }, [])

  return (firebaseUser) 
  // we have data of user since firebase
  ?(
    <Router>
      <div class="container">
        <Navegacion/>
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
