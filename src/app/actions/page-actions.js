import * as ActionTypes from './action-types';

export function startPageLoad(){
	return {type:ActionTypes.startPageLoad}
}

export function endPageLoad(){
    return {type:ActionTypes.endPageLoad}
}