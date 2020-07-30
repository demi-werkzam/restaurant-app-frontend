import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Jumbotron } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";

import "./index.css";
import { updateVisit, addVisit } from "../../store/visits/actions";
import { updateLike, addLike } from "../../store/like/actions";
import RestaurantMap from "../RestaurantMap";

export default function RestaurantCard(props) {
  const {
    id,
    name,
    address,
    latitude,
    longitude,
    instagram,
    website,
  } = props.data;
  const { token } = props;

  const [visited, setVisit] = useState(false);
  const [liked, setLike] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const goToAddRsvp = () => {
    history.push(`/rsvp`);
  };

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

  const addVisit = (id, token) => {
    if (!visited) {
      dispatch(updateVisit(setVisit(!visited)));
    }
    if (visited) {
      dispatch(addVisit(setVisit(visited)));
    }
  };

  const addLike = (id, token) => {
    if (!liked) {
      dispatch(updateLike(setLike(!liked)));
    }
    if (liked) {
      dispatch(addLike(setLike(liked)));
    }
  };

  return (
    <Container>
      <Jumbotron style={{ background: "#efefef" }}>
        <h1>{`${name}`}</h1>
      </Jumbotron>
      <Row>
        <Col>
          <Card>
            <Col>
              <FaInstagramSquare size="3rem" />
            </Col>
            <Col>
              <Card.Text>{`Follow ${name} on instagram to keep up with what they're doing`}</Card.Text>
              <Button variant="dark" size="lg" href={`${instagram}`}>
                Check out their instagram
              </Button>
            </Col>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Text>
              Let us know if you have visited this restaurant before
            </Card.Text>
            {token && (
              <button className="visitedButton" onClick={addVisit}>
                {visitedCheck}
              </button>
            )}
            {visited && (
              <button className="heartButton" onClick={addLike}>
                <span role="img">{likedCheck}</span>
              </button>
            )}
            <Button variant="dark" size="lg" onClick={goToAddRsvp}>
              Invite others
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardGroup>
            <Card
              border="light"
              style={{ background: "#b99c96" }}
              className="text-center"
            >
              <Card.Body>
                <Card.Text className="text-right">
                  <h5>Want to book a table?</h5>
                  <Button variant="dark" className="btn" href={`${website}`}>
                    {`Visit ${name}'s website here!`}
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              border={"#b99c96"}
              style={{ background: "#b99c96" }}
              className="text-center"
            >
              <Card.Body>
                <Card.Text className="text-right">{`Address: ${address}`}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <RestaurantMap id={id} latitude={latitude} longitude={longitude} />
    </Container>
  );
}
