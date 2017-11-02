import * as ActionTypes from '../actions/action-types';
const initialState = {
	list:[],
	item:{},
	fetching:false,
	fetched:false,
	saving:false
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.addItem:{
			state = {...state, list:[...state.list], item:{...state.item}};
			return state;
			break;			
		}
		case ActionTypes.getItem: {
			state = {...state, item:{...action.payload.item}, list:[...state.list]};
			return state;
			break;			
		}	
		case ActionTypes.clearItem: {
			state = {...state, item:{}, list:[...state.list]};
			return state;
			break;			
		}
		case ActionTypes.changeItem: {
			state = {...state, item:{...state.item}, list:[...state.list]};
			//state = JSON.parse(JSON.stringify(state));
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
			state = {...state, list:[], item:{...state.item}};
			return state;
			break;
		}
		case ActionTypes.startFetching:{
			state = {...state, list:[...state.list], item:{...state.item}};
			state.fetching = true;
			state.fetched = false;
			return state;
			break;			
		}
		case ActionTypes.endFetching: {
			state = {...state, list:[...state.list], item:{...state.item}};
			state.fetching = false;
			state.fetched = true;			
			return state;
			break;			
		}		
		case ActionTypes.startFetching:{
			state = {...state, list:[...state.list], item:{...state.item}};
			state.saving = true;
			return state;
			break;			
		}
		case ActionTypes.endFetching: {
			state = {...state, list:[...state.list], item:{...state.item}};
			state.saving = false;			
			return state;
			break;			
		}		
	}
	return state;
}
