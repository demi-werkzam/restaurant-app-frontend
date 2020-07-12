import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Jumbotron } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

import "./index.css";
import { updateAmountOfVisits } from "../../store/visits/actions";

export default function RestaurantCard(props) {
  const { id, name, address, email } = props.data;
  const { token } = props;
  const [visited, setVisit] = useState(false);
  const [liked, setLike] = useState(false);
  const dispatch = useDispatch();

  const visitedCheck = visited ? (
    <span role="img" aria-label="check mark button">
      ✅
    </span>
  ) : (
    <span role="img" aria-label="white large square">
      ⬜
    </span>
  );

  const likedCheck = liked ? (
    <span role="img" aria-label="sparkling heart">
      💖
    </span>
  ) : (
    <span role="img" aria-label="white heart">
      🤍
    </span>
  );

  const addVisit = () => {
    dispatch(updateAmountOfVisits(setVisit(!visited)));
  };

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

            {token && (
              <button class="visitedButton" onClick={addVisit}>
                {visitedCheck}
              </button>
            )}
            {visited && (
              <button class="heartButton" onClick={() => setLike(!liked)}>
                <span role="img">{likedCheck}</span>
              </button>
            )}
            <br />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
