import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { selectRestaurants } from "../../store/restaurants/selectors";
import { fetchVisitsWithUser } from "../../store/visits/actions";
import { fetchLikesWithUser } from "../../store/likes/actions";
import { fetchRestaurants } from "../../store/restaurants/actions";
import RestaurantDetailCard from "../../components/RestaurantDetailCard";
import { selectVisits } from "../../store/visits/selectors";
import { selectLikes } from "../../store/likes/selectors";
import {
  selectToken,
  selectUser,
  selectUserId,
} from "../../store/user/selectors";

import Container from "react-bootstrap/Container";

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRestaurants);
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchVisitsWithUser(userId, token));
    }
  }, [userId]);
  if (!token) {
    history.push("/");
  }

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchLikesWithUser(userId, token));
    }
  }, [userId]);
  if (!token) {
    history.push("/");
  }

  const restaurants = useSelector(selectRestaurants) || [];
  const visits = useSelector(selectVisits) || [];
  const likes = useSelector(selectLikes) || [];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return restaurant.id === parseInt(id, 10);
  });

  const filteredVisits = visits.filter((visit) => {
    return visit.userId === userId;
  });

  const filteredLikes = likes.filter((like) => {
    return like.userId === userId;
  });

  return (
    <Container>
      {filteredRestaurants.map((restaurant, i) => {
        return (
          <div key={i}>
            <RestaurantDetailCard
              data={restaurant}
              token={token}
              userVisits={filteredVisits}
              userLikes={filteredLikes}
            />
          </div>
        );
      })}
    </Container>
  );
}
