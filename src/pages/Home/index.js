import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";

import RestaurantCard from "../../components/RestaurantCard";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const restaurants = useSelector(selectRestaurants) || [];

  console.log(111, restaurants);

  return (
    <Container>
      <Jumbotron>
        <h1>List of restaurants</h1>
      </Jumbotron>
      {restaurants &&
        restaurants.map((restaurant, i) => {
          return (
            <p key={i}>
              {" "}
              <RestaurantCard data={restaurant} />
            </p>
          );
        })}
    </Container>
  );
}
