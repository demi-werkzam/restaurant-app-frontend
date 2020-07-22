import React from "react";
import { restaurantsFetched } from "../../store/restaurants/actions";

export default function Visited(props) {
  const { visits, createdAt, name, id } = props.data;

  const UserId = 2;

  const visitsFiltered = visits.map((visit) => {
    // console.log(
    //   1234,
    //   "this is the visitId:",
    //   visit.userId,
    //   "This is the restaurantId:",
    //   visit.restaurantId,
    //   "this is the restaurantId passed down:",
    //   id
    // );
    if (visit.userId === UserId && visit.restaurantId === id) return name;
  });

  console.log(12345, visitsFiltered);

  //   const restaurantId = 4;
  //   const specificrestaurantDetails = restaurant.find((p) => {
  //     console.log(11111, p);
  //     return p.id;
  //   });

  //   match visit.restaurantId to the namd of the restaurant

  return (
    <div>
      <p>{visitsFiltered}</p>
    </div>
  );
}
