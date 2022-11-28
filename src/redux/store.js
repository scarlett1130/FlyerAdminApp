import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from "./rootReducer";

const initialState = {};

const composeEnhancers = compose(
    applyMiddleware(thunkMiddleware)
);

const configureStore = () => {
    return createStore(rootReducer, initialState, composeEnhancers)
};

const store = configureStore();

export default store;
