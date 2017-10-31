import {db,storage} from '../config/firebase';

class FirebaseService {
	setPage(page) {
		this.currentPage = page;
	}

	getList(ref) {
		return db.ref(ref).orderByChild('createdAt').limitToLast(10).once('value').then((snap) =>{
	        let list = [];
	        snap.forEach(function(child,i) {
	            let item = child.val();
	            item.key = child.key;
	            list.push(item);
	            list.reverse();
	        });
	        return list;  
	    });
	}

	getItem({ref,id,settings}) {
		return db.ref(settings.ref).child(settings.id).once('value').then((snap) => {
            let rawItem = snap.val();
            rawItem.key = snap.key; 
            let item = {};
            let urlPromises = [];
            let urlAttributes = [];

			settings.properties.map((element) => {
                				
		        // If propery exist in FireBase
		        if (rawItem[element.attribute] !== undefined && rawItem[element.attribute] !== "") {
		        	item[element.attribute] = {...element, value:rawItem[element.attribute]};
		            // Image type property only
		            if(element.type==="img"){ 
		            	urlPromises.push(storage.ref(rawItem[element.attribute]).getDownloadURL());
		            	urlAttributes.push(element.attribute);
		            }
		        }
		    });   
		    if (urlPromises.length) {
		    	return Promise.all(urlPromises).then((arUrls) => {
		    		arUrls.map((url,i)=>{
		    			item[urlAttributes[i]].url = url;
		    		})
		    		return item; 
	            });
		    }        

	        return item;  
	    });    
	}	
}

export default FirebaseService;