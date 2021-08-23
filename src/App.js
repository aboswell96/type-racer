import './App.css';
import Home from './Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {

  const [height,setHeight] = useState({height: window.innerHeight});

  useEffect(
    ()=>{
      setHeight({height:window.innerHeight});
    }
  );

  return (
    <div className="container" style={height}>
      <Router>
      <div>
        <nav>
          <ul class="nav-bar">
            <li>
              <Link to="/">
                Race
              </Link>
            </li>
            <li>
              <Link to="/leaderboards">Leaderboards</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/leaderboards">
            <Leaderboard />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}


function Leaderboard() {
  return <h2>Leaderboard</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
