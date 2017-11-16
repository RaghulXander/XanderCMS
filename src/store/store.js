
import { createStore, applyMiddleware } from 'redux';
import * as thunk from "redux-thunk"
import { createLogger } from "redux-logger";
import rootReducer from '../reducer/root_reducer';

const logger = createLogger();

const store = createStore(rootReducer,
  {},
  applyMiddleware(thunk.default, logger)
);

export default store;
