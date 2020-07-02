import React from "react";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <Container>
      <Jumbotron>
        <h1>List of restaurants</h1>
      </Jumbotron>
    </Container>
  );
}
