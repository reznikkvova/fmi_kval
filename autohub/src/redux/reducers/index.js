import { combineReducers } from 'redux';
import details from './items';
import sortBy from './sortBy';
import search from './filter';
import cart from './cart';

const rootReducer = combineReducers({
  details,
  sortBy,
  search,
  cart,
});

export default rootReducer;
