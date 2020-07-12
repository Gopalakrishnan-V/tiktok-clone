import {combineReducers} from 'redux';
import user from './user';
import posts from './posts';

const AppReducer = combineReducers({
  user,
  posts,
});

export default AppReducer;
