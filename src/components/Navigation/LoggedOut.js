import React from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <Navbar.Brand as={NavLink} to="/">
        R&S
      </Navbar.Brand>
      <Nav style={{ width: "15000%" }} fill></Nav>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
