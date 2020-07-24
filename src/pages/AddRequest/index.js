import React, { useState } from "react";
import { Formik } from "formik";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

export default function AddRequest() {
  const today = new Date().toISOString().split("T", 1)[0];
  const [date, setDate] = useState(today);

  const [time, setTime] = useState();

  console.log(111, date);

  return (
    <Container>
      <Formik
        initialValues={{
          date: "",
          time: "",
          friends: "",
        }}
      >
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Invit your friends!</h1>
          <Form.Row>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Choose a date</Form.Label>
              <Form.Control name="date" type="date" value={date} required />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicTime">
              <Form.Label>And Time</Form.Label>
              <Form.Control name="time" type="time" required />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              value={time}
              style={{ width: "500px" }}
            >
              Set date and time
            </Button>
          </Form.Row>

          <Form.Group controlId="formBasicFriends">
            <Form.Label>Who would you like to join?</Form.Label>
            <Form.Control name="friends" type="text" required />
          </Form.Group>
        </Form>
      </Formik>
    </Container>
  );
}
