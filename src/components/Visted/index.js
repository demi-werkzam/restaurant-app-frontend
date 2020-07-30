import React from "react";
import { restaurantsFetched } from "../../store/restaurants/actions";

import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Visited(props) {
  const { visits, createdAt, name, id } = props.data;
  const { UserId } = props;
  const visitsFiltered = visits.map((visit) => {
    // console.log(
    //   1234,
    //   "this is the visitId:",
    //   visit.userId,
    //   "This is the restaurantId:",
    //   visit.restaurantId,
    //   "this is the restaurantId passed down:",
    //   id
    // );
    if (visit.userId === UserId && visit.restaurantId === id) return name;
    else return null;
  });

  console.log(12345, visitsFiltered);

  return (
    <CardColumns>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{visitsFiltered}</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardColumns>
  );
}
