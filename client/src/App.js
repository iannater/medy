import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Pages
import signup from "./Pages/signup";
import login from "./Pages/login";
import main from "./Pages/index";
import createMed from "./Pages/addMed";


function App() {
  return (
    <div className="App">
      <Router>
        <div className="blah">
      <Switch>
        <Route exact path="/" component={signup}/>
        <Route exact path="/main" component={main}/>
        <Route exact path="/login" component={login}/>
        <Route exact patch="/createMed" component={createMed}/>

      </Switch>
      </div>
      </Router>
      
  
    </div>
  );
}

export default App;
