import * as ActionTypes from '../actions/action-types';
const initialState = {
	loading:false
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.startPageLoad:{
			state = [...state];			
			state.loading = true;		
			return state;
			break;			
		}
		case ActionTypes.endPageLoad: {
			state = [...state];
			state.loading = false;
			return state;
			break;			
		}		
	}
	return state;
}
