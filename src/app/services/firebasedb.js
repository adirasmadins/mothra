import {db,storage} from '../config/firebase';

class Firebasedb {
    constructor(properties, settings) {
        this.settings = settings;
        settings.properties.map((element) => {
        	properties[element.attribute].settings = element;
        });
        this.properties = properties;
        this.message = "";
        this.error = [];
        this.itemSaved = true;
        console.log("I am Megatron!!!");
    }	

	//Random GUID look a like string generator
	uniqueID(){
	  function chr4(){
	    return Math.random().toString(16).slice(-4);
	  }
	  return chr4() + chr4() +
	    '-' + chr4() +
	    '-' + chr4() +
	    '-' + chr4() +
	    '-' + chr4() + chr4() + chr4();
	}

	//Add item to Firebase datebase and storage
    save() {
	    let properties = this.properties;
	    //Files array, will store File objects
	    let files = [];
	    //Item that will be actual insert
	    let insertItem = {};

	    let action = this.settings.action;
	    let rootRef = this.settings.ref;

	    //Fill the insertItem object anf files array
	    for (let property in properties) {
	        if (properties.hasOwnProperty(property)) {
	            //If it's img
	            if (properties[property].type==='img') {
	                //Create FBpath for image
	                if(properties[property].file!==undefined) {
	                	//Generate random name for image that will be inserted
	    				let randomName = this.uniqueID();
	                    var path = properties[property].settings.path + "/" + randomName + properties[property].file.name.substr(-4);
	                    files.push({fileObject:properties[property].file,path:path});
	                    insertItem[property] = path;
	                } else {
	                	insertItem[property] = properties[property].value;
	                }
	            }
	            //For other property types
	            else if(properties[property].type!==undefined){
	                insertItem[property] = properties[property].value;
	            }
	        }
	    }

	    if(action===undefined||action==='create')
	    	insertItem.createdAt = Date.now();

	    insertItem.updatedAt = Date.now();

	    /*
	        FireBase transaction.
	        After item inserted, add images to storage.
	    */
	    if(action===undefined||action==='create')
	        var newItem = db.ref().child(`${rootRef}`).push();
	    else
	        var newItem = db.ref(rootRef).child(this.settings.id);

	    return newItem.transaction(function(currentItem) {
	    	if(currentItem===null) {
	    		// If create New item
	    		return insertItem;
	    	} else {
	    		// If update item
			    for (let property in insertItem) {
			    	console.log(properties[property]);
			        if (insertItem.hasOwnProperty(property)) {
			            if (insertItem[property]!==undefined) {	  
			             	currentItem[property] = insertItem[property];
			            }
			        }
			    } 	
		        return currentItem;
	    	}
	    }, function(error, committed, snapshot) {
	        if (error) {
	            this.itemSaved = false;
	        } else if (!committed) {
	            this.itemSaved = false;
	        }

	        // Increment counter if commited
	        if(committed) {
	        	if(action===undefined||action==='create') {
	        		Firebasedb.counterIncrement(rootRef);
	        	}
	        }
	    }).then((e)=>{
	        // Add item if images saved, or delete item if images can't be saved
	        if(this.itemSaved)
	        {
	        	// All promises at once
	            return Promise.all(files.map(function(file) {
	                return storage.ref().child(file.path).put(file.fileObject);
	            })).catch((e)=>{
	                newItem.remove();
	                this.itemSaved = false;
	                this.error.push(e.message);
	            });
	        }
	        else {
	            return e;
	        }

	    }).catch((e)=>{
	       this.error.push(e.message);
	    });    	
    }

    getErrors() {
    	return this.error;
    }

    saved() {
    	return this.itemSaved;
    }

    static counterIncrement(countRef) {
    	return db.ref('counters').child(countRef).transaction(current => {
    		return (current || 0) + 1;
    	})    	
    }

    static counterDicrement(countRef) {
    	return db.ref('counters').child(countRef).transaction(current => {
    		return (current || 0) - 1;
    	})    	
    }

    static count(countRef) {
    	//db.ref('counters/'+countRef).remove();
    	return db.ref('counters/'+countRef).once("value").then((snap) => {
    		let counter = snap.val();
    		if (counter===null) {
    			return db.ref(countRef).once("value").then((snap) => {
    				let num = snap.numChildren();
    				db.ref('counters/' + countRef).set(num);
    				return num;  	
    			});
    			
    		} else {
    			return counter;
    		}
    	})
    }
    
    //Ref to counters
    static counter(countRef) {
    	return db.ref('counters/'+countRef);
    }    
}
export default Firebasedb;