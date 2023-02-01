import { legacy_createStore as createStore, compose } from "redux";

import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers.js";


const rootReducer = combineReducers({
  tasksReducer: reducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,

  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
