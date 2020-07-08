const initialState = {
  Restaurants: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "RESTAURANTS_FETCHED":
      return { ...state, Restaurants: payload };

    default:
      return state;
  }
};
