import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addRequest(data) {
  return {
    type: "ADD_REQUEST",
    payload: data,
  };
}

export function addUser(data) {
  return {
    type: "ADD_USER",
    payload: data,
  };
}

export function postNewRequest(data, token) {
  console.log("data in action:", data);
  return async function thunk(dispatch, getState) {
    axios
      .post(`${apiUrl}/requests`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addRequest(res.data)))
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

export function addFriendsToRequest(requestId, friends, userId, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.post(
      `${apiUrl}/${userId}`,
      {
        requestId,
        friends,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output:", output);
  };
}
