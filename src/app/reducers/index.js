import { combineReducers } from 'redux';
import items from './items';
import page from './page';
import messages from './messages';

const rootReducer = combineReducers({
	items: items,
	page:page,
	messages:messages
});

export default rootReducer;