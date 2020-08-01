import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import {
  selectRestaurants,
  selectUserIdRestaurants,
} from "../../store/restaurants/selectors";
import {
  selectUserId,
  selectUserName,
  selectToken,
} from "../../store/user/selectors";
import {
  fetchRestaurants,
  fetchRestaurantsWithUser,
} from "../../store/restaurants/actions";
import { fetchVisitsWithUser } from "../../store/visits/actions";
import { fetchLikesWithUser } from "../../store/likes/actions";
import Visited from "../../components/Visted";
import UserRestaurants from "../../components/UserRestaurants";

import "./index.css";

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
    }
  }, [userId]);
  if (!token) {
    history.push("/");
  }

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchVisitsWithUser(userId, token));
    }
  }, [userId]);
  if (!token) {
    history.push("/");
  }
  useEffect(() => {
    if (userId !== undefined) {
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

  return (
    <Container>
      <Jumbotron style={{ background: "#efefef" }}>
        <h1>{` Hi ${userName}`}</h1>
      </Jumbotron>
      <Tabs defaultActiveKey="visited">
        <Tab eventKey="visited" title="Visited">
          {restaurants &&
            restaurants.map((restaurant) => (
              <Visited key={restaurant.id} data={restaurant} />
            ))}
        </Tab>
        <Tab eventKey="liked" title="Favorites">
          <div>
            {
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
                      />
                    ))}
                  {activeRestaurant && (
                    <Popup
                      position={[
                        activeRestaurant.latitude,
                        activeRestaurant.longitude,
                      ]}
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
              </Card>
            }
          </div>
        </Tab>
        <Tab eventKey="your-restaurants" title="Restaurants">
          {restaurants &&
            restaurants.map((restaurant) => (
              <UserRestaurants key={restaurant.id} data={restaurant} />
            ))}
        </Tab>
      </Tabs>
    </Container>
  );
}
