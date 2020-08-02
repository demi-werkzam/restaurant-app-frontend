import React from "react";
import { restaurantsFetched } from "../../store/restaurants/actions";

import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Visited(props) {
  const { name, id, createdAt } = props.data;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{`${name}`}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {`you went to this restaurant on ${createdAt.split("T")[0]}`}
        </small>
      </Card.Footer>
    </Card>
  );
}
