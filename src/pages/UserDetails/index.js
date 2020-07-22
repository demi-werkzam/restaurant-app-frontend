import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import {
  selectRestaurants,
  selectVisits,
} from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";
import Visited from "../../components/Visted";
import "./index.css";

import { FaRegUserCircle } from "react-icons/fa";

export default function UserDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

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
              return <Visited key={id} data={restaurant} />;
            })}
        </Tab>
        <Tab eventKey="liked" title="Liked"></Tab>
        <Tab eventKey="requested" title="Requested"></Tab>
      </Tabs>
    </Container>
  );
}
