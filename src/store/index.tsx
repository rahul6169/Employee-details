import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducer";

const initialState = {};

const middleware = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedEnhancers);

export { store };
