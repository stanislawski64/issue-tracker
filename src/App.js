import './style.css';
// import './style2.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Backlog from './Backlog';
import Board from './Board';
import Settings from './Settings';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToolbarSideMenuContainer from './ToolbarSideMenuContainer';
import { AuthProvider } from './auth-context';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToolbarSideMenuContainer />
        <div className="ContentContainer">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/backlog" component={Backlog} />
            <Route path="/board" component={Board} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
