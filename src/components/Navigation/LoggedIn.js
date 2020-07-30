import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../store/user/actions";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";

export default function LoggedIn({ id }) {
  const dispatch = useDispatch();
  return (
    <>
      <NavbarItem exact path={`/home/users/${id}`} linkText="My Page" />
      <Nav.Item style={{ padding: ".5rem 1rem" }}></Nav.Item>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
