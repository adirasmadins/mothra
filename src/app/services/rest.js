import restConfig from '../config/rest';
import axios from 'axios';
export default class RestServise{
	getList({ref, order, filter, limit, last}) {
		return axios.get(restConfig.url).then(result=>{
			return {list:result.data,last:false};
		});
	}
}