import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {devTools, persistState} from 'redux-devtools';
import * as reducers from '../reducers/index';

let createStoreWithMiddleware;

createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);


const rootReducer = combineReducers(reducers);
console.log('reducers : ', reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
