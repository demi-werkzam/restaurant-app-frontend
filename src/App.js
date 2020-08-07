import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";

import Navigation from "./components/Navigation";
import MessageBox from "./components/MessageBox";

import Loading from "./components/Loading";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import UserDetails from "./pages/UserDetails";
import AddRsvp from "./pages/AddRsvp";
import AddRestaurant from "./pages/AddRestaurant";
import Start from "./pages/Start";

import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken } from "./store/user/selectors";

function App() {
  const isLoading = useSelector(selectAppLoading);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Card border="light" style={{ padding: ".5rem 1rem" }} />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/rsvp" component={AddRsvp} />
        <Route path="/restaurants/:id" component={RestaurantDetails} />
        <Route path="/home/users/:id/restaurant" component={AddRestaurant} />
        <Route exact path="/home/users/:id" component={UserDetails} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Start} />
      </Switch>
    </div>
  );
}

export default App;
