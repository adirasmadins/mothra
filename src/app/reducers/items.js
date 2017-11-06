import * as ActionTypes from '../actions/action-types';
const initialState = {
	list:[],
	fetching:false,
	last:''
}
export default function reducer(state = initialState, action){
	switch (action.type) {					
		case ActionTypes.getItemsList: {
			state = {...state, list:[...state.list,...action.payload.list], last:action.payload.last};
			return state;
			break;			
		}	
		case ActionTypes.reloadList: {
			state = {...state, list:[...action.payload.list], last:action.payload.last};
			return state;
			break;			
		}			
		case ActionTypes.clearItemsList: {
			state = {...state, list:[], last:''};
			return state;
			break;
		}
		case ActionTypes.removeItemFromList: {			
			state = {...state, list:[...state.list]};
			state.list.splice(action.payload.index, 1);
			return state;
			break;
		}		
		case ActionTypes.startFetching:{
			state = {...state, list:[...state.list]};
			state.fetching = true;
			state.fetched = false;
			return state;
			break;			
		}
		case ActionTypes.endFetching: {
			state = {...state, list:[...state.list]};
			state.fetching = false;
			state.fetched = true;			
			return state;
			break;			
		}			
	}
	return state;
}
