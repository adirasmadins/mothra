import {ref,storage} from '../config/constants'
import Messages from '../components/Messages';

//Random GUID look a like string generator
function uniqueID(){
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
export function addToFB (item,rootPath) {
    console.log(item);
    //Generate random name for image that will be inserted
    var randomName = uniqueID();
    //Files array, will store File objects
    var files = [];
    //Item that will be actual insert
    var insertItem = {};

    //Fill the insertItem object anf files array
    for (var property in item) {
        if (item.hasOwnProperty(property)) {
            //If it's img
            if (item[property].type==='img') {
                //Create FBpath for image
                var path = item[property].settings.path + "/" + uniqueID() + item[property].value.name.substr(-4);
                files.push({fileObject:item[property].value,path:path});
                insertItem[property] = path;
            }
            //For other property types
            else if(item[property].type!==undefined){
                insertItem[property] = item[property].value;
            }
        }
    }

    //If no Id then use default
    let id = item.id.value||'default';
    var itemSaved = false;
    insertItem.createdAt = Date.now();

    /*
        FireBase transaction. If theris already exist item with Id, the prevent insert and show message.
        If theris no such Id then insert new item.
        After item inserted, add images to storage.
    */
    var newItemRef = ref.child(`${rootPath}`).push();
    return newItemRef.transaction(function(currentItem) {
        //Check if game already exists
        if (currentItem === null) {
            itemSaved = true;
            return insertItem;
        }
        else {
            Messages.addErrorMsg(`Игра c Id "${id}" уже существует.`);
        }
    }, function(error, committed, snapshot) {
        if (error) {
            itemSaved = false;
        }
        else if(!committed){
            itemSaved = false;
        }
    }).then((e)=>{
        //Add icon if game saved, or delete game if icon can't be saved
        if(itemSaved)
        {

            return Promise.all(files.map(function(file) {
                console.log(file.path);
                return storage.ref().child(file.path).put(file.fileObject);
            })).then(()=>{
                Messages.addSuccesMsg(`Элемент "${item.name.value}" успешно добавлен.`);
            }).catch((e)=>{
                //ref.child(`${path}`).remove();
                Messages.addErrorMsg("Не удалось загрузить иконку: " + e.message);
            });
        }
        else {
            return e;
        }

    }).catch((e)=>{
        Messages.addErrorMsg("Произошла ошибка: " + e.message);
    });

}
