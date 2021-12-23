import { combineReducers } from "redux";
import userReducer from "./user/reducer";

const rootStore = combineReducers({
  user: userReducer,
});

export default rootStore;
