import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RestaurantCard(props) {
  const { id, name, address, email } = props.data;

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{`Name ${name}`}</Card.Title>
              <Card.Title>{`Address ${address}`}</Card.Title>
              <Card.Title>{`Telephone Number: Has to be added`}</Card.Title>
              <Card.Title>{`Email ${email}`}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
