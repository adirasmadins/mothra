import { combineReducers } from 'redux';
import itemsOrder from './items-order';
import item from './item';
import items from './items';
import page from './page';
import messages from './messages';

const rootReducer = combineReducers({
	items: items,
	item: item,
	itemsOrder: itemsOrder,
	page:page,
	messages:messages
});

export default rootReducer;