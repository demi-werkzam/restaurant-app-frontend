import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CardGroup from "react-bootstrap/CardGroup";

import { selectRestaurants } from "../../store/restaurants/selectors";
import {
  selectUserId,
  selectUserName,
  selectToken,
} from "../../store/user/selectors";
import { selectVisits } from "../../store/visits/selectors";
import { selectLikes } from "../../store/likes/selectors";
import { fetchRestaurantsWithUser } from "../../store/restaurants/actions";
import { fetchVisitsWithUser } from "../../store/visits/actions";
import { fetchLikesWithUser } from "../../store/likes/actions";
import Visited from "../../components/Visted";
import UserRestaurants from "../../components/UserRestaurants";

import "./index.css";

export const icon = new Icon({
  iconUrl: "../../R.png",
  iconSize: [25, 25],
});

export default function UserDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const token = useSelector(selectToken);

  const [activeRestaurant, setActiveRestaurant] = useState(null);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchRestaurantsWithUser(userId, token));
      dispatch(fetchVisitsWithUser(userId, token));
      dispatch(fetchLikesWithUser(userId, token));
    }
  }, [userId]);
  if (!token) {
    history.push("/");
  }

  const goToRestaurant = (id) => {
    history.push(`/restaurants/${id}`);
  };
  const restaurants = useSelector(selectRestaurants) || [];
  const visits = useSelector(selectVisits) || [];
  const likes = useSelector(selectLikes) || [];

  return (
    <Container>
      <Jumbotron fluid style={{ background: "#b99c96" }}>
        <h1>{` Hi ${userName}`}</h1>
      </Jumbotron>
      <div>
        <Card size="lg" style={{ background: "#e7e1d3" }}>
          <h1> Your Favourite Restaurants </h1>
        </Card>
      </div>
      <img src="../../R22.png" />
      <Map center={[52.370216, 4.895168]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {likes &&
          likes.map((like) => (
            <Marker
              key={like.id}
              position={[like.restaurant.latitude, like.restaurant.longitude]}
              onClick={() => {
                setActiveRestaurant(like.restaurant);
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
              <p>Want to know more about this restaurant?</p>
              <button
                className="btn"
                onClick={() => goToRestaurant(activeRestaurant.id)}
              >
                Click here!
              </button>
            </div>
          </Popup>
        )}
      </Map>
      <Tabs defaultActiveKey="visited">
        <Tab eventKey="visited" title="Visited">
          <CardGroup
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {visits &&
              visits.map((visit) => (
                <Visited
                  key={visit.id}
                  data={visit}
                  name={visit.restaurant.name}
                />
              ))}
          </CardGroup>
        </Tab>
        <Tab eventKey="your-restaurants" title="Restaurants">
          <CardGroup
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {restaurants &&
              restaurants.map((restaurant) => (
                <UserRestaurants key={restaurant.id} data={restaurant} />
              ))}
          </CardGroup>
        </Tab>
      </Tabs>
    </Container>
  );
}
