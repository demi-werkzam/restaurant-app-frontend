import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";

export function setVisits() {
  return {
    type: "SET_VISITS",
  };
}

export const addVisit = (id, token) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/visit`,
        {
          visited: true,
          id,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setVisits(...response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updateVisit = (id, token) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
      const response = await axios.patch(
        `${apiUrl}/visit`,
        {
          visited: false,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setVisits(...response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
