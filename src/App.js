import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";

import Navigation from "./components/Navigation";
import MessageBox from "./components/MessageBox";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import UserDetails from "./pages/UserDetails";
import AddRsvp from "./pages/AddRsvp";
import AddRestaurant from "./pages/AddRestaurant";

import { getUserWithStoredToken } from "./store/user/actions";
import { fetchRestaurants } from "./store/restaurants/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Card border="light" style={{ padding: ".5rem 1rem" }} />
      <MessageBox />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/restaurants/:id" component={RestaurantDetails} />
        <Route exact path="/home/users/:id" component={UserDetails} />
        <Route path="/home/users/:id/restaurant" component={AddRestaurant} />
        <Route path="/rsvp" component={AddRsvp} />
      </Switch>
    </div>
  );
}

export default App;
