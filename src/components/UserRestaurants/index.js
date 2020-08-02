import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { restaurantsFetched } from "../../store/restaurants/actions";

import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { selectUserName, selectUserId } from "../../store/user/selectors";

export default function UserRestaurants(props) {
  const { name, id, createdAt } = props.data;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{`${name}`}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {`you added this restaurant on ${createdAt.split("T")[0]}`}
        </small>
      </Card.Footer>
    </Card>
  );
}
