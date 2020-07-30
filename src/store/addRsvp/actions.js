import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addRsvp(data) {
  return {
    type: "ADD_RSVP",
    payload: data,
  };
}

export function addUser(data) {
  return {
    type: "ADD_USER",
    payload: data,
  };
}

export function postNewRsvp(data, token) {
  console.log("data in action:", data);
  return async function thunk(dispatch, getState) {
    axios
      .post(`${apiUrl}/rsvp`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addRsvp(res.data)))
      .catch((err) => console.log(err));
  };
}

export function fetchUser(email, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/user/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (output.data !== "") {
      dispatch(addUser(output.data));
    } else {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: { id: 0 },
      });
    }
  };
}

export function addFriendsToRsvp(rsvpId, friends, userId, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.post(
      `${apiUrl}/${userId}`,
      {
        rsvpId,
        friends,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output:", output);
  };
}
