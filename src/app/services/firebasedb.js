import {db,storage} from '../config/firebase';

class Firebasedb {
    constructor(properties, settings) {
        this.settings = settings;
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
    insert() {
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

	    //If no Id then use default
	    let id = properties.id.value||'default';

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
	        var newItem = db.ref().child(`${rootRef}`);

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
}
export default Firebasedb;