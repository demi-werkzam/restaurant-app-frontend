import { combineReducers } from "redux";
import restaurants from "./restaurants/reducer";
import user from "./user/reducer";
import appState from "./appState/reducer";
import addRsvp from "./addRsvp/reducer";
import visits from "./visits/reducer";
import likes from "./likes/reducer";

export default combineReducers({
  restaurants,
  user,
  appState,
  visits,
  likes,
  addRsvp,
});
