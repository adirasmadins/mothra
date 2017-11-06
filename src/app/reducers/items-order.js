import * as ActionTypes from '../actions/action-types';
const initialState = {};
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case ActionTypes.setOrder:
			return {attr:action.payload.attr, order:action.payload.order};
		break;
		case ActionTypes.clearOrder:
			return {};
		break;		
	}
	return state
}