import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import UserDetails from "./pages/UserDetails";
import AddRequest from "./pages/AddRequest";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/restaurants/:id" component={RestaurantDetails} />
        <Route path="/users" component={UserDetails} />
        <Route path="/requests" component={AddRequest} />
      </Switch>
    </div>
  );
}

export default App;
