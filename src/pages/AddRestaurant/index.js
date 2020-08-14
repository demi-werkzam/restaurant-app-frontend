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
import { apiKey } from "../../config/constants";

import { setMessage } from "../../store/appState/actions";
import { selectToken, selectUserId } from "../../store/user/selectors";
import { postNewRestaurant } from "../../store/restaurants/actions";

export default function AddRestaurant() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [formValues, setValues] = useState();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const getLatLon = async (values) => {
    const url = `https://eu1.locationiq.com/v1/search.php?key=${apiKey}&street=${values.address},&city=amsterdam&state=noord-holland,&country=Netherlands,&format=json&addressdetails=1&countrycodes=nl`;
    const response = await Axios.get(url);
    const getLatLong = response.data.map((r) => {
      setLat(parseFloat(r.lat));
      setLon(parseFloat(r.lon));
      console.log(r.address.restaurant);
      if (r.address.city !== "Amsterdam") {
        dispatch(
          setMessage(
            "danger",
            true,
            "You can only add restaurants in Amsterdam"
          )
        );
      } else {
        dispatch(setMessage("succes", true, "We have found your restaurant!"));
      }
    });
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
    console.log(123, lat, lon);

    dispatch(
      postNewRestaurant(
        values.name,
        values.address,
        values.website,
        values.instagram,
        lat,
        lon,
        token,
        userId
      )
    );
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

                <Form.Label>Street</Form.Label>
                <Form.Control
                  id="address"
                  placeholder="e.g. kalverstraat, 12"
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
              <Button
                style={{ background: "black" }}
                variant="dark"
                onClick={() => getLatLon(values)}
              >
                Search Restaurant
              </Button>
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
