import './style.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Backlog from './Backlog';
import Board from './Board';
import Settings from './Settings';
import Home from './Home';
import ToolbarSideMenuContainer from './ToolbarSideMenuContainer';

function App() {
  return (
    <Router>
      <ToolbarSideMenuContainer />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/backlog" render={() => <Backlog />} />
        <Route path="/board" render={() => <Board />} />
        <Route path="/settings" render={() => <Settings />} />
      </Switch>
    </Router>
  );
}

export default App;
