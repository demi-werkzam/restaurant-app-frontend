import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions";

export function visitsFetched(data) {
  return {
    type: "VISITS_FETCHED",
    payload: data,
  };
}

export const addVisit = (id, userid, token) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/visits/${userid}/${id}`);
      console.log("inside action", response.data);
      dispatch(fetchVisitsWithUser(userid, token));
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

export const deleteVisit = (id, userid, token) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.delete(`${apiUrl}/visits/${userid}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchVisitsWithUser(userid, token));
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

export const fetchVisitsWithUser = (userId, token) => {
  return async (dispatch, getState) => {
    const output = await axios.get(`${apiUrl}/visits/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(visitsFetched(output.data));
  };
};
