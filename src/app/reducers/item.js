import * as ActionTypes from '../actions/action-types';
const initialState = {
	item:{},
	fetching:false,
	saving:false
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		// Add Item
		case ActionTypes.addItem:{
			return {...state, item:{...state.item}};
			break;			
		}
		// Get Item
		case ActionTypes.getItem: {
			return {...state, item:{...action.payload.item}};
			break;			
		}	
		// Clear Item
		case ActionTypes.clearItem: {
			return {...state, item:{}};
			break;			
		}
		// Change Item
		case ActionTypes.changeItem: {
			state = {...state, item:{...state.item}};
			state.item[action.payload.data.attribute] = action.payload.data;
			return state;
			break;			
		}		
		// Start Item Fetching				
		case ActionTypes.startFetching:{
			return {...state, item:{...state.item}, fetching:true};
			break;			
		}
		// End Item Fetching
		case ActionTypes.endFetching: {		
			return {...state, item:{...state.item}, fetching:false};
			break;			
		}		
		// Start Item Saving
		case ActionTypes.startSaving:{
			return {...state, item:{...state.item}, saving:true};
			break;			
		}
		// End Item Saving
		case ActionTypes.endSaving: {			
			return {...state, item:{...state.item}, saving:false};
			break;			
		}		
	}
	return state;
}
