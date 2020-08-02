import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Jumbotron } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import { FaInstagramSquare } from "react-icons/fa";

import "./index.css";
import { deleteVisit, addVisit } from "../../store/visits/actions";
import { deleteLike, addLike } from "../../store/likes/actions";
import { selectUserId } from "../../store/user/selectors";
import RestaurantMap from "../RestaurantMap";

export default function RestaurantDetailCard(props) {
  const {
    id,
    name,
    address,
    latitude,
    longitude,
    instagram,
    website,
  } = props.data;
  const { token, userVisits, userLikes } = props;

  const dispatch = useDispatch();
  const userid = useSelector(selectUserId);

  const userVisitsFiltered = userVisits.filter((userVisit) => {
    return userVisit.restaurantId === id;
  });

  const userLikesFiltered = userLikes.filter((userLike) => {
    return userLike.restaurantId === id;
  });

  const visitedCheck =
    userVisitsFiltered.length > 0 ? (
      <span role="img" aria-label="check mark button">
        ✅
      </span>
    ) : (
      <span role="img" aria-label="white large square">
        ⬜
      </span>
    );

  const likedCheck =
    userLikesFiltered.length > 0 ? (
      <span role="img" aria-label="sparkling heart">
        💖
      </span>
    ) : (
      <span role="img" aria-label="white heart">
        🤍
      </span>
    );

  const handleVisit = (event) => {
    if (userVisitsFiltered.length > 0) {
      dispatch(deleteVisit(id, userid, token));
    } else {
      dispatch(addVisit(id, userid, token));
    }
  };

  const handleLike = (event) => {
    if (userLikesFiltered.length > 0) {
      dispatch(addLike(id, userid, token));
    } else {
      dispatch(deleteLike(id, userid, token));
    }
  };

  return (
    <Container>
      <Jumbotron
        fluid
        style={{
          background: "#b99c96",
        }}
      >
        <h1>{`${name}`}</h1>
      </Jumbotron>
      <Row>
        <Col>
          <Card
            style={{ padding: ".5rem 1rem", width: "550px", margin: "auto" }}
          >
            <Col>
              <FaInstagramSquare size="3rem" />
            </Col>
            <Col>
              <Card.Text>{`Follow ${name} on instagram to keep up with what they're doing`}</Card.Text>
              <Button variant="dark" size="lg" href={`${instagram}`}>
                Check out their instagram
              </Button>
              <Card border="light" style={{ padding: ".5rem 1rem" }} />
            </Col>
          </Card>
        </Col>
      </Row>
      <Card border="light" style={{ padding: ".5rem 1rem" }} />
      <Row>
        <Col>
          <CardGroup>
            <Card
              style={{
                border: "40px solid #b99c96",
              }}
            >
              <Card.Body>
                <Card.Text className="text-center">
                  Want to book a table?
                  <Card border="light" style={{ padding: ".5rem 1rem" }} />
                  <Button variant="dark" className="btn" href={`${website}`}>
                    {`Visit ${name}'s website here!`}
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                border: "40px solid #b99c96",
              }}
            >
              <Card.Body>
                {token ? (
                  <Card.Text>
                    Let us know if you have visited this restaurant before
                  </Card.Text>
                ) : (
                  <Card.Text>
                    Log in to keep track of the restaurants you have visited
                  </Card.Text>
                )}
                {token && (
                  <button className="Button-group" onClick={handleVisit}>
                    {visitedCheck}
                  </button>
                )}
                {userVisitsFiltered.length > 0 && (
                  <button
                    className="Button-group"
                    onClick={(event) => handleLike(event.target)}
                  >
                    <span role="img">{likedCheck}</span>
                  </button>
                )}
              </Card.Body>
            </Card>
            <Card
              style={{
                border: "40px solid #b99c96",
              }}
            >
              <Card.Body>
                <Card.Title>Address</Card.Title>
                <Card.Text className="text-center">{`${address}`}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>

      <img src="../R22.png" />

      <Card border="light" style={{ padding: ".5rem 1rem" }} />
      <RestaurantMap id={id} latitude={latitude} longitude={longitude} />
    </Container>
  );
}
