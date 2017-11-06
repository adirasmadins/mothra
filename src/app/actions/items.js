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
export function removeItemFromList({type = 'firebase', ref, index, id}) {
    const provider = getProvider(type);
    return (dispatch) => {
        return provider.removeItem(ref, id).then(() => {
            dispatch({type:ActionTypes.removeItemFromList, payload:{index:index}})
        });    
    }
}

export function addItem({type = 'firebase', ref, item}) {
    const provider = getProvider(type);
    return (dispatch) => {
        dispatch({type:ActionTypes.startSaving}); 
        return provider.addItem(ref, item).then(() => {
            dispatch({type:ActionTypes.endSaving});
        }).catch((e) =>{
            dispatch({type:ActionTypes.endSaving});
            throw e;
        });
    }
}

export function updateItem({type = 'firebase', ref, item, id}) {
    const provider = getProvider(type);
    return (dispatch) => {
        dispatch({type:ActionTypes.startSaving}); 
        return provider.updateItem(ref, item, id).then(() => {
            dispatch({type:ActionTypes.endSaving});
        }).catch((e) =>{
            dispatch({type:ActionTypes.endSaving});
            throw e;
        });
    }
}

export function getList({type = 'firebase', ref = '', order, filter, limit, last, page, add = false}){
    const provider = getProvider(type);
	return (dispatch) => {
        dispatch({type:ActionTypes.startFetching}); 
        return provider.getList({ref:ref, order:order, filter:filter, limit:limit, last:last}).then((result) => {

            if(add) {
                dispatch({type:ActionTypes.getItemsList, payload:{list:result.list, last:result.last}});
            } else {
                dispatch({type:ActionTypes.reloadList, payload:{list:result.list, last:result.last}});
            }

            dispatch({type:ActionTypes.endFetching});  
            return result; 
        }).catch((e) =>{
            dispatch({type:ActionTypes.endFetching}); 
            throw e;
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
        }).catch((e) =>{
            dispatch({type:ActionTypes.endFetching}); 
            throw e;
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

export function setOrder({attr, order, type, ref}){
    return (dispatch) => {
        dispatch({ type:ActionTypes.setOrder, payload:{attr:attr, order:order}});
        return getList({type:type, ref:ref, order:{attr:attr, order:order}})(dispatch);
    }
}

export function clearOrder(){
    return {
        type:ActionTypes.clearOrder
    }
}