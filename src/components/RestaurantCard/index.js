import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RestaurantCard(props) {
  const { id, name, address } = props.data;
  const history = useHistory();

  const goToRestaurant = () => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{`Name ${name}`}</Card.Title>
              <Card.Title>{`Address ${address}`}</Card.Title>
              <Button variant="primary" onClick={goToRestaurant}>
                See details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
