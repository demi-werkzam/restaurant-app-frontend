import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { selectUserId } from "../../store/user/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";
import Visited from "../../components/Visted";
import Liked from "../../components/Liked";
import "./index.css";

import { FaRegUserCircle } from "react-icons/fa";

export default function UserDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const userId = useSelector(selectUserId);
  const restaurants = useSelector(selectRestaurants) || [];

  return (
    <Container Container fluid="md">
      <Card className="cardLeft">
        <Row>
          <Col>
            <FaRegUserCircle size="12rem" />
          </Col>
          <Col>
            <Card.Text className="text-center">
              <strong>number of</strong> Visited
              <strong>number of</strong> Liked
            </Card.Text>
          </Col>
        </Row>
      </Card>

      <Tabs defaultActiveKey="visited">
        <Tab eventKey="visited" title="Visited">
          {restaurants &&
            restaurants.map((restaurant, id) => {
              return <Visited key={id} data={restaurant} userId={userId} />;
            })}
        </Tab>
        <Tab eventKey="liked" title="Liked">
          {restaurants &&
            restaurants.map((restaurant, id) => {
              return <Liked key={id} data={restaurant} UserId={userId} />;
            })}
        </Tab>
        <Tab eventKey="rsvp" title="Rsvp"></Tab>
      </Tabs>
    </Container>
  );
}
