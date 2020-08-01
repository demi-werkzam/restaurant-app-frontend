import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { Jumbotron } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { selectToken, selectUserId } from "../../store/user/selectors";
import { postNewRestaurant } from "../../store/restaurants/actions";

export default function AddRestaurant() {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  function addNewRestaurant(values) {
    console.log(
      "name",
      values.name,
      "address",
      values.address,
      "website",
      values.website,
      "instagram",
      values.instagram,
      "latitude",
      values.latitude,
      "longitude",
      values.longitude
    );
    dispatch(postNewRestaurant(values, token, userId));
  }

  // Yup Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*start time is required"),
    website: Yup.string().required("*website is required"),
    instagram: Yup.string().required("*instagram is required"),
    latitude: Yup.number().required("*latitude is required"),
    longitude: Yup.number().required("*longitude is required"),
  });
  return (
    <Container>
      <Jumbotron style={{ background: "#efefef" }}>
        <h1>Add your restaurant</h1>
      </Jumbotron>

      <Card
        style={{
          background: "#b99c96",
          border: "40px solid #b99c96",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            address: "",
            website: "",
            instagram: "",
            latitude: "",
            longitude: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
              addNewRestaurant(values);
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form
              md={{ span: 6, offset: 3 }}
              onSubmit={handleSubmit}
              className="mt-5"
            >
              <Form.Group as={Row}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Name of the restaurant"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  id="address"
                  placeholder="Address of the restaurant"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  className={
                    errors.address && touched.address
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.address && touched.address && (
                  <div className="error-message">{errors.address}</div>
                )}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  id="website"
                  placeholder="http://"
                  type="text"
                  value={values.website}
                  onChange={handleChange}
                  className={
                    errors.webiste && touched.website
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.website && touched.website && (
                  <div className="error-message">{errors.website}</div>
                )}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  id="instagram"
                  placeholder="http://instagram"
                  type="text"
                  value={values.instagram}
                  onChange={handleChange}
                  className={
                    errors.instagram && touched.instagram
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.instagram && touched.instagram && (
                  <div className="error-message">{errors.instagram}</div>
                )}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>latitude</Form.Label>
                <Form.Control
                  id="latitude"
                  type="text"
                  value={values.latitude}
                  onChange={handleChange}
                  className={
                    errors.latitude && touched.latitude
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.latitude && touched.latitude && (
                  <div className="error-message">{errors.latitude}</div>
                )}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>longitude</Form.Label>
                <Form.Control
                  id="longitude"
                  type="text"
                  value={values.longitude}
                  onChange={handleChange}
                  className={
                    errors.longitude && touched.longitude
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.longitude && touched.longitude && (
                  <div className="error-message">{errors.longitude}</div>
                )}
              </Form.Group>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
