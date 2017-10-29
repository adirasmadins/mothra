import { combineReducers } from 'redux';
import items from './items';
import page from './page';

const rootReducer = combineReducers({
	items: items,
	page:page
});

export default rootReducer;