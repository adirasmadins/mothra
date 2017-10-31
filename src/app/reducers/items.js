import * as ActionTypes from '../actions/action-types';
const initialState = {
	list:[],
	item:{},
	fetching:false,
	fetched:false
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.addItem:{
			state = {...state};
			return state;
			break;			
		}
		case ActionTypes.getItem: {
			state = {...state, item:{...action.payload.item}};
			return state;
			break;			
		}	
		case ActionTypes.clearItem: {
			state = {...state, item:{}};
			return state;
			break;			
		}
		case ActionTypes.changeItem: {
			state = {...state, item:{...state.item}};
			state.item[action.payload.data.attribute] = action.payload.data;
			return state;
			break;			
		}						
		case ActionTypes.getItemsList: {
			state = {...state, list:[...state.list,...action.payload.list]};
			return state;
			break;			
		}		
		case ActionTypes.clearItemsList: {
			state = {...state, list:[]};
			return state;
			break;
		}
		case ActionTypes.startFetching:{
			state = {...state};
			state.fetching = true;
			state.fetched = false;
			return state;
			break;			
		}
		case ActionTypes.endFetching: {
			state = {...state};
			state.fetching = false;
			state.fetched = true;			
			return state;
			break;			
		}		
	}
	return state;
}
