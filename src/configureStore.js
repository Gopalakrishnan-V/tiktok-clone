import {createStore, applyMiddleware} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import errorMiddleware from './helpers/errorMiddleware';
import rootReducer from './reducers';

export default () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(errorMiddleware, reduxPromiseMiddleware),
  );

  return {store};
};
