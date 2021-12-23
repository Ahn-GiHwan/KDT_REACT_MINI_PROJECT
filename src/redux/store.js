import { createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import rootStore from "./rootStore";

const middleware = [thunk, logger];
const store = createStore(rootStore, applyMiddleware(...middleware));

export default store;
