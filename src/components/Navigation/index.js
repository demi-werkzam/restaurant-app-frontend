import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken, selectUserId } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import "./index.css";

export default function Navigation() {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const loginLogoutControls = token ? <LoggedIn id={userId} /> : <LoggedOut />;

  return (
    <Navbar variant="light" className="nav-color" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img src="R.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill></Nav>
        {loginLogoutControls}
      </Navbar.Collapse>
    </Navbar>
  );
}
