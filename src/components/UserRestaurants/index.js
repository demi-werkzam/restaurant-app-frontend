import React from "react";

import Card from "react-bootstrap/Card";

export default function UserRestaurants(props) {
  const { name, id, createdAt } = props.data;

  return (
    <Card
      style={{
        height: "150px",
        width: "300px",
        margin: "5px",
      }}
    >
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
