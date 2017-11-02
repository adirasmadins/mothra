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

export function addItem({type = 'firebase', ref, item}) {
    const provider = getProvider(type);
    return (dispatch) => {
        dispatch({type:ActionTypes.startSaving}); 
        return provider.addItem(ref, item)/*.then(() => {
            dispatch({type:ActionTypes.endSaving});
        })*/
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
        return provider.getItem({ref:settings.ref, id:settings.id, settings:settings}).then((item) => {
            dispatch({type:ActionTypes.getItem, payload:{item:item}});
            dispatch({type:ActionTypes.endFetching});  
            return item; 
        }).catch((e)=>{
            console.log(e);
        });
    }
}

export function changeItem(data){
    return {
        type:ActionTypes.changeItem,
        payload:{data:data}
    }
}

export function clearItem(){
    return {
        type:ActionTypes.clearItem
    }
}

export function clearItemsList(){
    return {
        type:ActionTypes.clearItemsList
    }
}