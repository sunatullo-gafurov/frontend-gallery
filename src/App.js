import React from 'react';
import './App.css';
import './index.css';
import WelcomePage from './layouts/WelcomePage';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import Dashboard from './layouts/Dashboard';
import NotFound from './layouts/NotFound';
import Toolbar from './components/Toolbar';

const App = () => {
  return (
    <Router>
      <Switch>
        <Toolbar exact path="/" component={WelcomePage} />
        <Toolbar exact path="/register" component={RegistrationForm} />
        <Toolbar exact path="/login" component={LoginForm} />
        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
