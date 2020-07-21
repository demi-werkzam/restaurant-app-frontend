import React from "react";
import { Nav } from "react-bootstrap";

export default function UserDetails() {
  return (
    <Nav fill variant="tabs">
      <Nav.Item>
        <Nav.Link href="/home"> Visited </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2"> Liked </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3"> Requested</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
