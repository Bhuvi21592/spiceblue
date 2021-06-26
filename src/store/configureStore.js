import {createStore, applyMiddleware,compose} from 'redux';
import taskReducer from '../reducers/taskReducer';
import createSagaMiddleware from 'redux-saga'
import { saga } from '../saga/saga'

export const sagaMiddleware = createSagaMiddleware()
export function configureStore(initialState) {
   const middleware = [sagaMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   const store = createStore(taskReducer,
     initialState, composeEnhancers(applyMiddleware(...middleware)));
     sagaMiddleware.run(saga);
     return store;
   }