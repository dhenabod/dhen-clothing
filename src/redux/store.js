import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

// the middleware that the store is expecting from redux is going to be an array
const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// create persisted version of the store
export const persistor = persistStore(store);

export default { store, persistor };
