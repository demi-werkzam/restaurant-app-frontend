const initialState = {
  Likes: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LIKES": {
      return { ...state, Likes: payload };
    }
    case "LIKES_FETCHED":
      return { ...state, Likes: payload };

    default:
      return state;
  }
};
