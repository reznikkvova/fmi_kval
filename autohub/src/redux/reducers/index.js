import { combineReducers } from 'redux';
import headerCategories from './header-categories';
import details from './items';
import sortBy from './sortBy';
import search from './filter';
import cart from './cart';

const rootReducer = combineReducers({
  headerCategories,
  details,
  sortBy,
  search,
  cart,
});

export default rootReducer;
