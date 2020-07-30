const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIKES": {
      return action.payload;
    }

    default:
      return state;
  }
};
