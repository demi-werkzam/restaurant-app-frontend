import { apiUrl } from "../../config/constants";
import axios from "axios";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { selectUserId } from "../user/selectors";

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

export const fetchRestaurantsWithUser = (userId, token) => {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/restaurants/${userId}`, token, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(restaurantsFetched(output.data));
  };
};

export const postNewRestaurant = (
  name,
  address,
  website,
  instagram,
  lat,
  lon,
  token,
  userId
) => {
  return async (dispatch, getState) => {
    if (token === null) return;
    try {
      console.log(
        "inside post rest",
        name,
        address,
        website,
        instagram,
        lat,
        lon
      );
      const output = await axios.post(
        `${apiUrl}/restaurants/${userId}`,
        { name, address, website, instagram, lat, lon },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(restaurantsFetched);

      dispatch(
        showMessageWithTimeout("success", true, "The restaurant has been added")
      );
    } catch (error) {
      if (error.output) {
        console.log(error.output.data.message);
        dispatch(setMessage("danger", true, error.output.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
};
