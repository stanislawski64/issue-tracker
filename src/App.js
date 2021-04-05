import './style.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Backlog from './Backlog';
import Board from './Board';
import Settings from './Settings';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToolbarSideMenuContainer from './ToolbarSideMenuContainer';

function App() {
  return (
    <Router>
      <ToolbarSideMenuContainer />
      <div className="ContentContainer">
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/backlog" render={() => <Backlog />} />
          <Route path="/board" render={() => <Board />} />
          <Route path="/settings" render={() => <Settings />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
