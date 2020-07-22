import React from "react";

import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export default function Liked(props) {
  const { visits, createdAt, name, id } = props.data;

  const UserId = 2;

  const likesFiltered = visits.map((visit) => {
    // console.log(
    //   1234,
    //   "this is the visitId:",
    //   visit.userId,
    //   "This is the restaurantId:",
    //   visit.restaurantId,
    //   "this is the restaurantId passed down:",
    //   id,
    //   "this is visit.likes",
    //   visit.likes
    // );
    if (visit.visitId === UserId && visit.restaurantId === id)
      //   visit.likes.map((l) => {
      //     console.log(123456, "inside visit.like.map. l.liked is:", l.liked);
      //   });
      return null;
  });

  console.log(12345, likesFiltered);

  return (
    <CardColumns>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{likesFiltered}</Card.Title>
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
