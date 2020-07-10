import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

export default function RestaurantCard(props) {
  const { id, name, address, email } = props.data;

  return (
    <Container>
      <Jumbotron>
        <h1>{`${name}`}</h1>
      </Jumbotron>
      <Row>
        <Col>
          <Card border="light" bg="dark">
            <Accordion className="text-right">
              <Card.Header>
                <Accordion.Toggle
                  bg="Light"
                  as={Button}
                  variant="light"
                  eventKey="0"
                >
                  More information
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Card.Text className="text-right">{`Address: ${address}`}</Card.Text>
                  <Card.Text className="text-right">{`Telephone Number: Has to be added`}</Card.Text>
                  <Card.Text className="text-right">{`Email: ${email}`}</Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
