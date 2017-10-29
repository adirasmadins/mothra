import * as ActionTypes from './action-types';
import {db,storage} from '../config/firebase';
import FirebaseService from '../services/firebase';

function getProvider(type) {
    switch(type) {
        case 'firebase':{
            return new FirebaseService();
            break;
        }
    }
}

export function getList({type = 'firebase', ref = '', page = 1}){
    const provider = getProvider(type);
	return (dispatch) => {
        dispatch({type:ActionTypes.startFetching}); 
        return provider.getList(ref).then((list) => {
            dispatch({type:ActionTypes.getItemsList, payload:{list:list}});
            dispatch({type:ActionTypes.endFetching});  
            return list; 
        });
	}
}

export function getItem({type = 'firebase', ref, id, settings}){
    const provider = getProvider(type);
    return (dispatch) => {
        dispatch({type:ActionTypes.startFetching}); 
                console.log(settings.id);
        return provider.getItem({ref:settings.ref, id:settings.id}).then((list) => {
            //dispatch({type:ActionTypes.getItemsList, payload:{list:list}});
            dispatch({type:ActionTypes.endFetching});  
            return list; 
        }).catch((e)=>{
            console.log(e);
        });
    }
}

export function clearItemsList(){
    return {
        type:ActionTypes.clearItemsList
    }
}