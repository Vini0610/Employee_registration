import React from 'react';
import './App.css';
import Employee from './Employee';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <empProvider > */}
        

        {/* <Employee></Employee> */}

        {/* </empProvider> */}

      </div>
      <Switch>
        <Route exact path="/"> <LoginPage /> </Route>
        <Route exact path="/registration"> <RegistrationPage /> </Route>
        <Route exact path="/employee"> <Employee /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
