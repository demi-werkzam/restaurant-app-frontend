import React from "react";

import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export default function Liked(props) {
  const { name, id, createdAt } = props.data;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{`${name}`}</Card.Title>
      </Card.Body>
    </Card>
  );
}
