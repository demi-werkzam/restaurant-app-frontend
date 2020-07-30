import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";

export function setLikes() {
  return {
    type: "SET_LIKES",
  };
}

export const addLike = (id, token) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/like`,
        {
          liked: true,
          id,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setLikes(...response.data));
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

export const updateLike = (id, token) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
      const response = await axios.patch(
        `${apiUrl}/like`,
        {
          liked: true,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setLikes(...response.data));
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
