import * as ActionTypes from '../actions/action-types';
const initialState = {
	loading:false
}
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.startPageLoad:{	
			return {loading:true};
			break;			
		}
		case ActionTypes.endPageLoad: {
			return {loading:false};
			break;			
		}		
	}
	return state;
}
