import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import "./index.css";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";

import RestaurantCard from "../../components/RestaurantCard";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const restaurants = useSelector(selectRestaurants) || [];

  const goToRestaurant = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <Container>
      <Jumbotron>
        <h1>restaurants</h1>
      </Jumbotron>
      <Map center={[52.370216, 4.895168]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurants &&
          restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude, restaurant.longitude]}
              onClick={() => goToRestaurant(restaurant.id)}
            />
          ))}
      </Map>
    </Container>
  );
}
