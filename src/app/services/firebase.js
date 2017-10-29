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

	getItem({ref,id}) {
		return db.ref(ref).child(id).once('value').then((snap) =>{
            let item = snap.val();
            item.key = snap.key; 
	        return item;  
	    });    
	}	
}

export default FirebaseService;