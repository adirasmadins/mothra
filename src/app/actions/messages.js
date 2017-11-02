import * as ActionTypes from './action-types';

export function addMessage(message){
	return {type:ActionTypes.addMessage,payload:{message:message,type:'common'}}
}

export function addErrorMessage(message){
	return {type:ActionTypes.addMessage,payload:{message:message,type:'error'}}
}

export function addSuccessMessage(message){
	return {type:ActionTypes.addMessage,payload:{message:message,type:'success'}}
}

export function removeMessage(index){
    return {type:ActionTypes.removeMessage, payload:{messageIndex:index}}
}