export default function reducer(state = [], action){
	switch (action.type) {
		case 'ADD_ITEM':{
			state = [...state, action.payload.b];
			return state;
			break;			
		}
	}
	return state;
}
