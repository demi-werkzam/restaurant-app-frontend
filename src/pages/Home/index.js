import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer, Popup } from "react-leaflet";

import "./index.css";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const restaurants = useSelector(selectRestaurants) || [];

  const goToRestaurant = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <Container>
      <Carousel className="slide-show">
        <Carousel.Item>
          <img alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Third slide" />
        </Carousel.Item>
      </Carousel>

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
              onClick={() => {
                setActiveRestaurant(restaurant);
              }}
            />
          ))}
        {activeRestaurant && (
          <Popup
            position={[activeRestaurant.latitude, activeRestaurant.longitude]}
            onClose={() => {
              setActiveRestaurant(null);
            }}
          >
            <div>
              <h2> Hello there</h2>
            </div>
          </Popup>
        )}
      </Map>
    </Container>
  );
}
