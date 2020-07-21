import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "./index.css";

import { FaRegUserCircle } from "react-icons/fa";

const pageContent = (eventKey) => {
  if (eventKey === "link-1") {
    return <div>hey it worked! </div>;
  }
  if (eventKey === "link-2") {
    return <div> It worked again! </div>;
  }
};

export default function UserDetails() {
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
        <Tab eventKey="visited" title="Visited"></Tab>
        <Tab eventKey="liked" title="Liked"></Tab>
        <Tab eventKey="requested" title="Requested"></Tab>
      </Tabs>
    </Container>
  );
}
