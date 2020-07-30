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

import { selectToken, selectUser } from "../../store/user/selectors";
import {
  postNewRequest,
  fetchUser,
  addFriendsToRequest,
  addRequest,
} from "../../store/addRequests/actions";
import MessageBox from "../../components/MessageBox/index";
import "./index.css";
import { selectNewRequest } from "../../store/addRequests/selectors";

// Yup Schema
const validationSchema = Yup.object().shape({
  date: Yup.string().required("*Date is required"),
  start_at: Yup.string().required("*start time is required"),
});

export default function AddRequest() {
  const today = new Date().toISOString().split("T", 1)[0];
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Add Friend");
  const token = useSelector(selectToken);

  console.log(12, token);

  const user = useSelector(selectUser);
  const { request = {}, newUser = {} } = useSelector(selectNewRequest) || {};
  const dispatch = useDispatch();
  const history = useHistory();

  const addFriend = () => {
    if (email !== user.email) {
      setMessage("Add Friend");
      dispatch(fetchUser(email, token));
      setEmail("");
    } else {
      setMessage("Cannot add loggedin user as friend");
      setEmail("");
    }
  };

  function addRequest(values) {
    console.log(
      "date:",
      typeof values.date,
      "start at:",
      typeof values.start_at
    );

    const data = new FormData();
    data.append("date", values.date);
    data.append("start start_at", values.start_at);
    console.log("data:", data);

    dispatch(postNewRequest(data, token));
  }

  function finalSubmit(event) {
    event.preventDefault();
    dispatch(addFriendsToRequest(request.id, friends, user.id, token));

    dispatch({
      type: "CLEAR_Request",
    });
    history.push("/");
  }

  useEffect(() => {
    if (Object.entries(newUser).length !== 0) {
      if (newUser.id === 0) {
        setMessage(`User not found`);

        dispatch({
          type: "CLEAR_NEWUSER",
          payload: {},
        });
      } else {
        const newUsers = [...friends];
        const found = newUsers.find((user) => user.id === newUser.id);
        if (!found) {
          newUsers.push(newUser);
        } else {
          setMessage(`${newUser.name} is already added`);
        }
        setFriends(newUsers);
      }
    }
  }, [newUser]);

  console.log(11, useSelector(selectNewRequest));

  console.log("request:", request);
  console.log("newUser:", newUser);
  console.log("friends:", friends);
  return (
    <div>
      <Jumbotron style={{ background: "#efefef" }}>
        <h1>Invite Youre Friends</h1>
      </Jumbotron>
      <div>
        <Container>
          <Formik
            initialValues={{
              date: "",
              start_at: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // When button submits form and form is in the process of submitting, submit button is disabled
              setSubmitting(true);

              // Simulate submitting to database, shows us values submitted, resets form
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                addRequest(values);
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
                  <Form.Label>Pick A Date</Form.Label>
                  <Form.Control
                    value={values.date}
                    onChange={handleChange}
                    name="date"
                    type="date"
                    className={touched.date && errors.date && "error"}
                  />
                  {touched.date && errors.date ? (
                    <div className="error-message">{errors.date}</div>
                  ) : null}
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label>And A Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={values.start_at}
                    name="start_at"
                    onChange={handleChange}
                    className={touched.start_at && errors.start_at && "error"}
                  />
                  {touched.start_at && errors.start_at ? (
                    <div className="error-message">{errors.start_at}</div>
                  ) : null}
                </Form.Group>

                <Form.Group as={Row} className="mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Date and Time
                  </Button>
                  <MessageBox />
                </Form.Group>
              </Form>
            )}
          </Formik>
          {friends.length > 0
            ? friends.map((f, i) => (
                <p key={i} style={{ color: "green" }}>
                  <em>{f.name} is Added to the trip</em>
                </p>
              ))
            : null}
          {Object.entries(request).length !== 0 ? (
            <Form>
              <Form.Group as={Row}>
                <Form.Label>
                  <em>{message}</em>
                </Form.Label>
                <div className="row">
                  <div className="col">
                    <Form.Control
                      type="text"
                      value={email}
                      style={{ marginLeft: "20px", width: "200px" }}
                      placeholder="email of the user"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <Button
                      onClick={addFriend}
                      style={{ marginLeft: "50px" }}
                      type="button"
                      className="btn btn-primary btn-circle btn-md"
                    >
                      <strong style={{ fontSize: "2em" }}>+</strong>
                    </Button>
                  </div>
                </div>
              </Form.Group>
            </Form>
          ) : null}
          <Form>
            <Form.Group as={Row} className="mt-5">
              <Button variant="primary" type="submit" onClick={finalSubmit}>
                submit
              </Button>
              <MessageBox />
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
