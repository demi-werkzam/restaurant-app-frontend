import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./pages/Home/index";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
