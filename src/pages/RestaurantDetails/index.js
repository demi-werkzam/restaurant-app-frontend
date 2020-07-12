import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchRestaurants } from "../../store/restaurants/actions";
import RestaurantDetailCard from "../../components/RestaurantDetailCard";
import { selectToken } from "../../store/user/selectors";

import { Jumbotron } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  const restaurants = useSelector(selectRestaurants) || [];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return restaurant.id === parseInt(id, 10);
  });

  return (
    <Container>
      {filteredRestaurants.map((restaurant, i) => {
        return (
          <div key={i}>
            <RestaurantDetailCard data={restaurant} token={token} />
          </div>
        );
      })}
    </Container>
  );
}
