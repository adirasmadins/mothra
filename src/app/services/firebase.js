import { db,storage } from '../config/firebase';
import { uniqueID } from './helpers';

class FirebaseService {
	setPage(page) {
		this.currentPage = page;
	}

	/**
	 * Add item to firebse
	 * @param {string} ref     - Firebase reference
	 * @param {Object} rawItem - Item to insert
	 */
	addItem(ref, rawItem) {
		let itemRef = db.ref().child(ref).push();
		return this._save(itemRef, rawItem, this._set)
	}

	/**
	 * Remove item from Firebase
	 * @param  {string} ref  - Firebase reference
	 * @param  {string} id   - Node key in Firebase
	 * @return {Promise}     - Firebase promise
	 */
	removeItem(ref, id){
		return db.ref(ref).child(id).remove();
	}

	/**
	 * Update item
	 * @param  {string} ref     - Firebase reference
	 * @param  {Object} rawItem - Item to update
	 * @param  {string} id      - Node key in firebase
	 * @return {Promise}        - Firebase promise
	 */
	updateItem(ref, rawItem, id) {	
		let itemRef = db.ref(ref).child(id);
		return this._save(itemRef, rawItem, this._transaction)
	}

	/**
	 * Set item in Firebase
	 * @param {string} ref  - Firebase reference
	 * @param {Object} item - Item to set
	 * @result {Promise} 	- Firebase Set promise
	 */
	_set(ref, item) {
	    item.createdAt = Date.now();
	    item.updatedAt = Date.now();		
		return ref.set(item);
	}

	/**
	 * Update item. Using firebase transaction method
	 * @param  {string} ref  - Firebase reference
	 * @param  {Object} item - Item to update
	 * @return {Promise}     - Firebase transaction promise
	 */
	_transaction(ref, item) {
	    item.updatedAt = Date.now();			
		return ref.transaction((currentItem) => {
			return {...currentItem, ...item};
		});
	}

	/**
	 * Saving images if exist and preparing Item from RawItem to insert
	 * @param  {string} itemRef        - Firebase reference
	 * @param  {Object} rawItem        - Item to insert/update
	 * @param  {Callback} saveFunction - Function that will do actual inser/update
	 * @return {Promise}               - Firebase promise
	 */				
	_save(itemRef, rawItem, saveFunction) {		
		let key = itemRef.key;
		let fireImgPromises = [];
		let item = {};

		//Prepare array with Imagis save Promisis
	    for (let property in rawItem) {
	        if (rawItem.hasOwnProperty(property)) {	
	        	if (rawItem[property].type==='fireimg'&&rawItem[property].file) {	   
					let fireImgRef = itemRef.parent.key +"/" + key + "/" + uniqueID() + rawItem[property].file.name.substr(-4); 
					fireImgPromises.push(storage.ref('root').child(fireImgRef).put(rawItem[property].file));
	        	}    	
	        }
	    }	

	    //If exist images to insert then, resolve all promises first
	    if (fireImgPromises.length) {
	    	return Promise.all(fireImgPromises).then((result) => {
	    		let fireImgCount = 0;
			    for (let property in rawItem) {
			        if (rawItem.hasOwnProperty(property)) {	
			        	if (rawItem[property].type==='fireimg'&&rawItem[property].file) {	   
							item[property] = result[fireImgCount].metadata.downloadURLs[0];
							fireImgCount++;
			        	} else {
			        		item[property] = rawItem[property].value;
			        	}    	
			        }
			    }

			    return saveFunction(itemRef,item);
	    	});
	    // If there is no images to save then just save item to Firebase DB
	    } else {
		    for (let property in rawItem) {
		        if (rawItem.hasOwnProperty(property)) {	
		        	item[property] = rawItem[property].value;  	
		        }
		    }	  
		    return saveFunction(itemRef,item);  	
	    }		
	}

	/**
	 * Get items list from Firebase database
	 * @param  {string} ref  - Fiebase referece to database
	 * @return {Promise}     - Firebase promise
	 */
	getList({ref, order, filter, limit, last}) {
		//.orderByChild('createdAt')
		let query = db.ref(ref);
		if(order&&order.attr) {
			query = query.orderByChild(order.attr);
		} else {
			query = query.orderByKey();
		}	
		if (limit) {
			limit = limit + 1;
		} else {
			limit = 11;
		}
		
		if(order&&order.order&&order.order==='DESC') {
			query = query.limitToLast(limit);
			if (last) {
				if(order&&order.attr) {
					query = query.endAt(last.attr,last.key);
				} else {
					query = query.endAt(last.key);
				}	
			}
		} else {
			query = query.limitToFirst(limit);
			if (last) {
				if(order&&order.attr) {
					query = query.startAt(last.attr,last.key);
				} else {
					query = query.startAt(last.key);
				}					
			}			
		}

		return query.once('value').then((snap) =>{
	        let list = [];
	        snap.forEach(function(child,i) {
	            let item = child.val();
	            item.key = child.key;
	            list.push(item);
	        });

	        if(order&&order.order&&order.order==='DESC')
	        	list.reverse();

	        let lastItem = list.splice(limit - 1, 1); 
	        console.log(lastItem);
	        if(lastItem[0]) {	        	
	        	if(order&&order.attr) {
	        		lastItem = {key:lastItem[0].key, attr:lastItem[0][order.attr]};
	        	} else {
	        		lastItem = {key:lastItem[0].key};
	        	}
	        } else {
	        	lastItem = false;
	        }
	        return {list:list, last:lastItem};  
	    });
	}

	/**
	 * Get item from Firebase 
	 * @param  {string} options.ref       - Firebase reference
	 * @param  {string} options.id        - Firebase node key
	 * @param  {Object} options.settings  - Setting of retriving item
	 * @return {Promise}                  - Firebase promise
	 */
	getItem({ref,id,settings}) {
		return db.ref(settings.ref).child(settings.id).once('value').then((snap) => {
            let rawItem = snap.val();
            rawItem.key = snap.key; 
            let item = {};

			settings.properties.map((element) => {                				
		        // If propery exist in FireBase
		        if (rawItem[element.attribute] !== undefined && rawItem[element.attribute] !== "") {
		        	item[element.attribute] = {...element, value:rawItem[element.attribute]};
		        }
		    });         

	        return item;  
	    });    
	}	
}

export default FirebaseService;