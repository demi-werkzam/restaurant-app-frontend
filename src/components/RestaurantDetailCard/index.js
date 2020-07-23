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
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";

import "./index.css";
import { updateAmountOfVisits } from "../../store/visits/actions";
import RestaurantMap from "../RestaurantMap";

export default function RestaurantCard(props) {
  const { id, name, address, email, latitude, longitude } = props.data;
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
                  <Col>
                    <Card.Text className="text-right">{`Address: ${address}`}</Card.Text>
                  </Col>
                  <AiFillPhone size="1.5rem" />
                  <Card.Text className="text-right">{`Telephone Number: Has to be added`}</Card.Text>
                  <Card.Text className="text-right">{`Email: ${email}`}</Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Col>
              <FaInstagramSquare size="3rem" />
            </Col>
            <Col>
              <Card.Text>{`Follow ${name} on instagram to keep up with what they're doing`}</Card.Text>
              <Button
                variant="dark"
                size="lg"
                href="https://www.instagram.com/yourlbb/"
              >
                Follow
              </Button>
            </Col>
          </Card>
        </Col>
        <Col>
          <Card className="cardLeft">
            <Card.Text>
              Let us know if you have visited this restaurant before
            </Card.Text>
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
            <Button variant="dark" size="lg">
              Invite others
            </Button>
          </Card>
        </Col>
      </Row>
      <RestaurantMap id={id} latitude={latitude} longitude={longitude} />
    </Container>
  );
}
