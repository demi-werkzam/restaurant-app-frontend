import React from "react";

import Card from "react-bootstrap/Card";

export default function Visited(props) {
  const { name, createdAt } = props.data;

  return (
    <Card style={{ width: "20rem" }}>
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
