import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../store/user/actions";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";

import "./index.css";

export default function LoggedIn({ id }) {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar.Brand as={NavLink} to="/home">
        R&S
      </Navbar.Brand>
      <Nav style={{ width: "15000%" }} fill></Nav>

      <NavbarItem
        className="nav-link-color "
        path={`/home/users/${id}`}
        linkText="My Page"
      />
      <Nav.Item style={{ padding: ".5rem 1rem" }}></Nav.Item>
      <Button variant="dark" href={`/home/users/${id}/restaurant`}>
        Add Restaurant
      </Button>
      <Nav.Item style={{ padding: ".5rem 1rem" }}></Nav.Item>
      <Button variant="dark" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </>
  );
}
