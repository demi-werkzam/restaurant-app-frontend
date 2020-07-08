import { apiUrl } from "../../config/constants";
import axios from "axios";

export function restaurantsFetched(data) {
  return {
    type: "RESTAURANTS_FETCHED",
    payload: data,
  };
}

export async function fetchRestaurants(dispatch, getState) {
  const output = await axios.get(`${apiUrl}/restaurants`);
  dispatch(restaurantsFetched(output.data));
}
