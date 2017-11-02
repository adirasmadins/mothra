import * as ActionTypes from '../actions/action-types';
const initialState = [];
export default function reducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.addMessage:{
			state = JSON.parse(JSON.stringify(state));			
			state.push({message:action.payload.message,type:action.payload.type});	
			return state;
			break;			
		}
		case ActionTypes.removeMessage: {
			state = JSON.parse(JSON.stringify(state));
			state.splice(action.payload.index, 1);
			return state;
			break;			
		}		
	}
	return state;
}
