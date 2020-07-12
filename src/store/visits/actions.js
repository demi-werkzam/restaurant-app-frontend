import axios from "axios";
import { apiUrl } from "../../config/constants";

export function setVisits() {
  return {
    type: "SET_VISITS",
  };
}

export const updateAmountOfVisits = () => {
  return async (dispatch, getState) => {
    const response = await axios.patch(`${apiUrl}/visits`, {
      visits: +1,
    });

    dispatch(setVisits(...response.data));
  };
};
