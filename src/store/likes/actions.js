import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions";

export function LikesFetched(data) {
  return {
    type: "LIKES_FETCHED",
    payload: data,
  };
}

export const addLike = (id, userid, token) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/likes/${userid}/${id}`);
      dispatch(fetchLikesWithUser(userid, token));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteLike = (id, userid, token) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.delete(`${apiUrl}/visits/${userid}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchLikesWithUser(userid, token));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
      dispatch(appDoneLoading());
    }
  };
};

export const fetchLikesWithUser = (userId, token) => {
  return async (dispatch, getState) => {
    const output = await axios.get(`${apiUrl}/likes/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(LikesFetched(output.data));
  };
};
