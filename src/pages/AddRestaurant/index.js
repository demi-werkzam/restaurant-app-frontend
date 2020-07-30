import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export default function AddRestaurant() {
  // Yup Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*start time is required"),
    website: Yup.string().required("*website is required"),
    instagram: Yup.string().required("*instagram is required"),
    latitude: Yup.integer().required("*latitude is required"),
    longitude: Yup.integer().required("*longitude is required"),
  });
  return <div>Hello</div>;
}
