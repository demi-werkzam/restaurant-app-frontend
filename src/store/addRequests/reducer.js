const initialState = {
  request: {},
  newUser: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_REQUEST":
      return {
        ...state,
        request: payload,
      };
    case "CLEAR_REQUEST":
      return {
        ...state,
        request: {},
        newUser: {},
      };
    case "ADD_USER":
      return {
        ...state,
        newUser: payload,
      };
    case "USER_NOT_FOUND":
      return {
        ...state,
        newUser: payload,
      };
    case "CLEAR_NEWUSER":
      return {
        ...state,
        newUser: payload,
      };
    default:
      return state;
  }
};
