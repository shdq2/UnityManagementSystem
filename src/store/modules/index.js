import { combineReducers } from 'redux';
import login from './login';
import collection from './collection';
import authority from './authority';
import location from './location';
export default combineReducers({
  login,collection,authority,location
});