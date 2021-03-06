const initialState = {
  Visits: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VISITS": {
      return { ...state, Visits: payload };
    }
    case "VISITS_FETCHED":
      return { ...state, Visits: payload };

    default:
      return state;
  }
};
