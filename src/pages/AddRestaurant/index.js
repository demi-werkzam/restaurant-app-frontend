import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { LocationIq } from "locationiq";
import Axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import { Jumbotron } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { setMessage } from "../../store/appState/actions";
import { selectToken, selectUserId } from "../../store/user/selectors";
import { postNewRestaurant } from "../../store/restaurants/actions";

export default function AddRestaurant() {
  const url = `https://eu1.locationiq.com/v1/search.php?key=40406b189b7470&street=neveritaweg,59,&city=amsterdam&state=noord-holland,&country=Netherlands,&format=json&addressdetails=1&countrycodes=nl`;
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const { searchedRestaurnt, setSearchedRestaurant } = useState();

  const getLatLon = async () => {
    const response = await Axios.get(url);
    const getLatLong = response.data.map((r) => {
      const lat = r.lat;
      const lon = r.lon;
      console.log(r.address.restaurant);
      if (r.address.city !== "Amsterdam") {
        console.log("You can only add restaurants in Amsterdam");
        dispatch(
          setMessage(
            "danger",
            true,
            "You can only add restaurants in Amsterdam"
          )
        );
      } else if (r.address.restaurant === "Pllek") {
        dispatch(
          setMessage("succes", true, "You've added the right restaurant")
        );
      } else console.log("This restaurant is in Amsterdam");
    });

    console.log(12, response.data);
  };

  function addNewRestaurant(values) {
    console.log(
      "name",
      values.name,
      "address",
      values.address,
      "website",
      values.website,
      "instagram",
      values.instagram
    );
    dispatch(postNewRestaurant(values, token, userId));
  }

  // Yup Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*address is required"),
    website: Yup.string().required("*website is required"),
    instagram: Yup.string().required("*instagram is required"),
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
                  id="Address"
                  placeholder="eg De Dam"
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
                  placeholder="https://"
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
                  placeholder="https://instagram"
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
              <Button
                style={{ background: "black" }}
                variant="dark"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
