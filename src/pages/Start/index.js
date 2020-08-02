import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";
import { selectUserId, selectToken } from "../../store/user/selectors";

import "./index.css";
import Card from "react-bootstrap/Card";

export const icon = new Icon({
  iconUrl: "../../R.png",
  iconSize: [25, 25],
});

export default function Start() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const restaurants = useSelector(selectRestaurants) || [];
  const LoggedInUserId = useSelector(selectUserId);
  const token = useSelector(selectToken);

  const goToLogin = () => {
    history.push(`/login`);
  };

  return (
    <Container>
      <div>
        <Card size="lg" style={{ background: "#e7e1d3" }}>
          <h1> Search & Find </h1>
        </Card>
      </div>
      <Card>
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
                icon={icon}
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
                <h6>{`${activeRestaurant.name}`} </h6>
                <hr></hr>
                <p>Login to find out more about this Restaurant?</p>
                <button className="btn" onClick={goToLogin}>
                  Click here!
                </button>
              </div>
            </Popup>
          )}
        </Map>
      </Card>
      <img src="../../R_b.png" />
    </Container>
  );
}
