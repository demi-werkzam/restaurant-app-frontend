const initialState = {
  rsvp: {},
  newUser: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_RSVP":
      return {
        ...state,

        rsvp: payload,
      };
    case "CLEAR_RSVP":
      return {
        ...state,
        rsvp: {},
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
