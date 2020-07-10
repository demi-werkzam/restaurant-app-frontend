import { combineReducers } from "redux";
import restaurants from "./restaurants/reducer";
import user from "./user/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  restaurants,
  user,
  appState,
});
