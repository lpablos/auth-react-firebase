import Navegacion from './components/Navegacion'
import Login from './components/Login'
import Admin from './components/Admin'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
